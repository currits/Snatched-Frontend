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
  // The code for the menu that can be dragged up from the bottom of the interface.
  // We will use it to display listing info when a marker is tapped
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Defines the proportion of the screen the bottom sheet occupies when open
  const snapPoints = useMemo(() => ['35%'], []);

  // This function is passed to each marker, so that when a marker is tapped it sends back up it's listing data for us to populate the bottom sheet
  // We use the buttons to open detailed listing views etc
  const onSelectMarker = (listing) => {
    setSelectedMarker(listing);
    // Bring up the bottom sheet
    bottomSheetRef.current.snapToIndex(0);
    // Set it's content using state so it renders
    setBottomSheetContent(
      <ListingInfoSheet
        item={listing}
        onInfoPress={() => navigation.push('ListingDetailScreen', { listing }) }
        onSnatchPress={toggleProtocolModal}
      />
    );
  }

  // Inital state of the bottom sheet
  // On first load, shows a welcome message
  const [bottomSheetContent, setBottomSheetContent] = useState((
    <View style={[{marginTop: -50}, appStyles.centeredContainer]}>
      <Title text="Welcome to Snatched!" style={{ textAlign: 'center' }} />
      <Description text="Scroll around to find listings in your area."/>
      <Description text="Tap a marker to find out more information about a listing."/>
      <Description text="Search using the button in the top right corner."/>
    </View>
  ));

  // Setup auth for fetching from the api
  const { getJwt } = useAuth();
  
  //    Marker Code   //
  // This method handles finding any listings within a certain distance of the center point of the mapview
  // The data retrieved is then used to drop markers onto the map that correspond to the listings
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
        // if no markers in this area
        if (response.status == 204) {
            setMarkers([]);
        }
        else if (response.status == 200) {
          response.json().then((json) => {
            setMarkers(json);
          });
        }
      } else {
        throw await response.text();
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  // Marker state for list of markers.
  const [markers, setMarkers] = useState([]);
  // state for knowing which marker is selected, if any
  const [selectedMarker, setSelectedMarker] = useState(null);

  // State to handle changing map center as the user manipulates it
  // Has an initial value for now
  const [requestCenter, setRequestCenter] = useState({
    latitude: -38.220234,
    longitude: 175.862656,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  // This method is used to set the new center of the map after a user finished dragging it
  // then tries to get the listings from this new center
  // Is also called on load to populate the map with any listings around the user
  const handleCenterMove = async (newCenter, gestureObject) => {
    console.log('New map center:', newCenter);
    // If the user is 'moving' the map away after viewing a marker, close the bottom sheet
    if (gestureObject.isGesture) 
      bottomSheetRef.current.close();
    setRequestCenter(newCenter);
    console.log("attempting to contact server.");
    getListingsInArea(requestCenter.latitude, requestCenter.longitude);
  }

  // This method gets the users location and animates the map to center on them on load.
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

  // Request location permissions on load
  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    scrollToUserLocation();
  }, []);
  
  // Reference for manipulating the map view
  const mapRef = useRef();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onRegionChangeComplete={handleCenterMove}
      >
        {/* Here we use the ListingMarker component to create listing on the map using the raw data from the api */}
        {markers.map(listing => (
          <ListingMarker 
            key={listing.listing_ID}
            listing={listing}
            onSelectMarker={onSelectMarker}
            isSelected={selectedMarker ? selectedMarker.listing_ID === listing.listing_ID : false} />
        ))}
      </MapView>
      {/* The bottom sheet, for displaying listing information when a user selects a map marker */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{backgroundColor: dynamicStyles.color}}
        backgroundStyle={dynamicBackgroundStyles}
      >
        {bottomSheetContent}
      </BottomSheet>
      {/* The protocol modal, for displaying protocol and contact detail popups when the user presses Snatch! */}
      <ProtocolModal
        visible={isProtocolModalVisible}
        toggleModal={toggleProtocolModal}
        listing={selectedMarker}
      />
   </View>
  );
}

export { HomeScreen }
