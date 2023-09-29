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
import { CreateMarker } from '../components/CreateMarker';
import BottomSheet from '@gorhom/bottom-sheet'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import {request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import ListingInfoSheet from '../components/ListingInfoSheet';
import ProtocolModal from '../components/ProtocolModal';
import { Description, Title } from '../components/Text';
import { appStyles } from '../components/Styles';

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
  
  //this function is passed to each marker, so that when a marker is tapped it sends back up it's listing data for us to populate the bottom sheet
  //we will use the buttons to open detailed listing views etc
  const displayListingInfo = (listing) => {
    bottomSheetRef.current.snapToIndex(0);
    console.log('displayListingInfo Call');
    setBottomSheetContent(
      <ListingInfoSheet
        item={ listing }
        onInfoPress={() => navigation.push('ListingDetailScreen', { item :listing })}
        onSnatchPress={toggleProtocolModal}
      />
    );
  }

  // We prolly wanna hide this until a marker is selected
  // OR set this to a 'welcome, scroll around to find listings in ur area' type thing
  const [bottomSheetContent, setBottomSheetContent] = useState((
    <View style={[{marginTop: -50}, appStyles.centeredContainer]}>
      <Title text="Welcome to Snatched!" style={{ textAlign: 'center' }} />
      <Text>Scroll around to find listings in your area.</Text>
      <Text>Tap a marker to find out more information about a listing.</Text>
      <Text>Search using the button in the top right corner.</Text>
    </View>
  ));
  
  //    Marker Code   //
  //basic code for communicating with api
  //note that the ip address is just what the emulator uses, will need to present an actual address later
  //fetch is passed a signal object so it can be aborted if the user tries to make another, different request
  const url = 'http://10.0.2.2:5000/';
  const getListingsInArea = async (lat, lon) => {
    fetch(url + "listing/?lat=" + lat + "&lon=" + lon)
    .then(response => {
      if(!response.ok)
        throw new Error("Error retrieving multiple listings from server.");
      return response.json();
    })
    .then(json => {
      console.log(json[0]);
      setMarkers(json);
      })
    .catch(error => {console.error(error)});
  }
  const markerList = [{lat: -37.78825, lon: 175.289350, title:'test one', description:'test 1 desc', listing_ID: 1},
  {lat: -36.78825, lon: 176.289350, title:'test two', description:'test 2 desc', listing_ID: 2},
  {lat: -38.78825, lon: 174.289350, title:'test three', description:'test 3 desc', listing_ID: 3},
  {lat: -37.78825, lon: 177.289350, title:'test four', description:'test 4 desc', listing_ID: 4},
  {lat: -35.78825, lon: 175.289350, title:'test five', description:'test 5 desc', listing_ID: 5},
  {lat: -34.78825, lon: 175.289350, title:'test six', description:'test 6 desc', listing_ID: 6}]

  //marker state for list of markers.
  const [markers, setMarkers] = useState(markerList);

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
        console.log(position);
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
        {markers.map(r => CreateMarker(r, displayListingInfo))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
      >
        {bottomSheetContent}
      </BottomSheet>
      
      <ProtocolModal
        visible={isProtocolModalVisible}
        toggleModal={toggleProtocolModal}
      />
   </View>
  );
}

export { HomeScreen }
