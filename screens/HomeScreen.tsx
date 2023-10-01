import React, {useCallback, useMemo, useEffect, useRef, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Button
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ListingMarker } from '../components/ListingMarker';
import BottomSheet from '@gorhom/bottom-sheet'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import {request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import { useAuth } from '../contexts/AuthContext';

import { useDummyList } from '../contexts/DummyContext';
import ListingInfoSheet from '../components/ListingInfoSheet';
import ProtocolModal from '../components/ProtocolModal';
import { Description, Title } from '../components/Text';
import { dynamicStyles, dynamicBackgroundStyles, appStyles } from '../components/Styles';

const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

function HomeScreen( {route, navigation} ) {
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            IconComponent={Icon} iconSize={23}
            title="location"
            iconName="my-location"
            onPress={scrollToUserLocation}
          />
          <Item
            IconComponent={Icon} iconSize={23}
            title="search"
            iconName="search"
            onPress={() => { navigation.navigate('Search') }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);


  //    Exchange Protocol popup hooks    //
  const [isProtocolModalVisible, setProtocolModalVisible] = useState(false);

  const toggleProtocolModal = () => {
    setProtocolModalVisible(!isProtocolModalVisible);
  };

  //    Bottom Sheet Code   //
  //below is the code for the menu that can be dragged up from the bottom of the interface.
  //we will use it to display listing info when a makrer is tapped
  const bottomSheetRef = useRef<BottomSheet>(null);
  //memo is a thing that lets a component not be rerendered when its parent is rerendered -> optimisation
  const snapPoints = useMemo(() => ['35%'], []);
  
  //retaining this code from bottomsheet usage description for now
  //we likely wont have use for tracking bottomsheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);}, []);

  const [contactOptions, setContactOptions] = useState(null);

  //this function is passed to each marker, so that when a marker is tapped it sends back up it's listing data for us to populate the bottom sheet
  //we will use the buttons to open detailed listing views etc
  const onSelectMarker = (listing) => {
    setSelectedMarker(listing);

    bottomSheetRef.current.snapToIndex(0);
    setContactOptions({should_contact: (listing.should_contact == 1) ? true : false, user_ID: listing.userUserID, listing_ID: listing.listing_ID});
    setBottomSheetContent(
      <ListingInfoSheet
        item={listing}
        onInfoPress={() => navigation.push('ListingDetailScreen', { listing }) }
        onSnatchPress={toggleProtocolModal}
      />
    );
  }

  // We prolly wanna hide this until a marker is selected
  // OR set this to a 'welcome, scroll around to find listings in ur area' type thing
  const [bottomSheetContent, setBottomSheetContent] = useState((
    <View style={[{marginTop: -50}, appStyles.centeredContainer]}>
      <Title text="Welcome to Snatched!" style={{ textAlign: 'center' }} />
      <Description text="Scroll around to find listings in your area."/>
      <Description text="Tap a marker to find out more information about a listing."/>
      <Description text="Search using the button in the top right corner."/>
    </View>
  ));

  const { getJwt } = useAuth();
  
  //    Marker Code   //
  //basic code for communicating with api
  //note that the ip address is just what the emulator uses, will need to present an actual address later
  //fetch is passed a signal object so it can be aborted if the user tries to make another, different request
  const getListingsInArea = async (lat, lon) => {
    try {
      const response = await fetch(
        API_ENDPOINT + "/listing/?lat=" + lat + "&lon=" + lon, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        }}
      )
        
      if (response.ok) {
        response.json().then((json) => {
          setMarkers(json);
        })
      } else {
        throw await response.text();
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  //marker state for list of markers.
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  //this is how we can manage updating markers as we scroll
  //this sets up a 'center' state for us to use to send requests to the DB
  const [requestCenter, setRequestCenter] = useState({
    //later change this to the map/users' starting coords
    latitude: -37.791545,
    longitude: 175.289350,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  //and this will be called after every map scroll completes, to update the 'center'
  //(should also be called when map first created to get the initial markers)
  const handleCenterMove = async (newCenter, gestureObject) => {
    console.log('New map center:', newCenter);
    if (gestureObject.isGesture) 
      bottomSheetRef.current.close();
    setRequestCenter(newCenter);
    console.log("attempting to contact server.");
    getListingsInArea(requestCenter.latitude, requestCenter.longitude);
    //here we would use setMarkers to change the list of markers we need to display and it s h o u l d update on map on its own if im interpreting states right
  }

  const scrollToUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        mapRef.current?.animateCamera({
            center: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            zoom: 14,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  // Request location on load
  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    scrollToUserLocation();
  }, []);

  const mapRef = useRef();

  //added lines for logging on map ready and on region change complete events
  //included in this wall are two new modals, basically the popups. when i understand more i'd like to perhaps split these out into their own const functions
  //inside this file, so the home screen function is less bloated. I would instead split them into new files but we need to keep them in (i think) as they
  //need to be accessed by the onPress call for the pressables inside the onPress for the map markers (so many layers omg)
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={false}
        region={{
          latitude: -37.791545,
          longitude: 175.289350,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChangeComplete={handleCenterMove}
      >
        {/* TODO: somehow render the selected marker on top when panning map */}
        {markers.map(listing => (
          <ListingMarker 
            key={listing.id}
            listing={listing}
            onSelectMarker={onSelectMarker}
            isSelected={selectedMarker.listing_ID === listing.listing_ID} />
        ))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{backgroundColor: dynamicStyles.color}}
        backgroundStyle={dynamicBackgroundStyles}
      >
        {bottomSheetContent}
      </BottomSheet>
      
      <ProtocolModal
        visible={isProtocolModalVisible}
        toggleModal={toggleProtocolModal}
        contactOptions={contactOptions}
      />
   </View>
  );
}

export { HomeScreen }
