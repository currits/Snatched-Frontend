import React, {useCallback, useMemo, useEffect, useRef, useState} from 'react';
import { CreateMarker } from '../components/CreateMarker';
import BottomSheet from '@gorhom/bottom-sheet'
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import {request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 contentContainer: {
  flex: 1,
  alignItems: 'center',
},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '50%',
  },
  buttonMoreInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'darkgray',
    marginHorizontal: 8,
  },
  buttonSnatch: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'dimgray',
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  protocolView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  protocolModal: {
    flex: 1,
    flexDirection: 'column',
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contactView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
    marginBottom: '35%'
  },
  contactModal: {
    flex: 1,
    flexDirection: 'column',
    width: '80%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContact: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'dimgray',
    marginHorizontal: 8,
  },
  modalText: {
    flex: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonClose: {
    flex: 1,
    alignSelf: 'flex-end'
  },
});

function HomeScreen( {route, navigation} ) {

  //    Exchange Protocol popup hooks    //
  const [protocolPopupVisible, setProtocolVisible] = useState(false);
  const [contactPopupVisible, setContactVisible] = useState(false);

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
  const displayListingInfo = (title, desc) => {
    bottomSheetRef.current.snapToIndex(0);
    console.log('displayListingInfo Call');
    setBottomSheetContent(
      <View style={styles.contentContainer}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20
        }}>
          Listing Information
        </Text>
        <Text>{title}</Text>
        <Text>{desc}</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => navigation.push('ListingDetailScreen', { item :{name: title, description: desc} })} style={styles.buttonMoreInfo}>
            <Text style={styles.buttonText}>More Info</Text>
          </Pressable>
          <Pressable onPress={() => setProtocolVisible(!protocolPopupVisible)} style={styles.buttonSnatch}>
            <Text style={styles.buttonText}>Snatch!</Text>
            </Pressable>
        </View>
      </View>
    );
  }

  const [bottomSheetContent, setBottomSheetContent] = useState((<View style={styles.contentContainer}>
    <Text>Awesome 🎉</Text>
  </View>));
  
  //    Marker Code   //
  //dummy array of markers. here we should instead send request to DB for listings within certain distance then use response to build markers
  const dudMarkers = [{latitude: -37.78825, longitude: 175.289350, title:'test one', desc:'test 1 desc', id: 1},
  {latitude: -36.78825, longitude: 176.289350, title:'test two', desc:'test 2 desc', id: 2},
  {latitude: -38.78825, longitude: 174.289350, title:'test three', desc:'test 3 desc', id: 3},
  {latitude: -37.78825, longitude: 177.289350, title:'test four', desc:'test 4 desc', id: 4},
  {latitude: -35.78825, longitude: 175.289350, title:'test five', desc:'test 5 desc', id: 5},
  {latitude: -34.78825, longitude: 175.289350, title:'test six', desc:'test 6 desc', id: 6}]

  //marker state for list of markers.
  const [markers, setMarkers] = useState(dudMarkers);

  //this is how we can manage updating markers as we scroll
  //this sets up a 'center' state for us to use to send requests to the DB
  const [requestCenter, setRequestCenter] = useState({
    //later change this to the map/users' starting coords
    latitude: -37.791545,
    longitude: 175.289350,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,});

  //and this will be called after every map scroll completes, to update the 'center'
  //(should also be called when map first created to get the initial markers)
  const handleCenterMove = (newCenter, gestureObject) => {
    console.log('New map center:', newCenter);
    if (gestureObject.isGesture) 
      bottomSheetRef.current.close();
    setRequestCenter(newCenter);
    //here we would use setMarkers to change the list of markers we need to display and it s h o u l d update on map on its own if im interpreting states right
  }

  useEffect(() => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  });

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
        showsMyLocationButton={true}
        region={{
          latitude: -37.791545,
          longitude: 175.289350,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChangeComplete={handleCenterMove}
      >
        {markers.map(r => CreateMarker(r, displayListingInfo))}
        {Platform.OS === 'ios' &&
          <View
            style={{
                position: 'absolute', //use absolute position to show button on top of the map
                margin: 15
            }}
          >
            <Icon
              name="my-location"
              size={20}
              color="#000"
              onPress={() => {
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
                    // See error code charts below.
                    console.log(error.code, error.message);
                  },
                  {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
                );
              }}
            />
          </View>
        }
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={protocolPopupVisible}
        onRequestClose={() => {
          setProtocolVisible(!protocolPopupVisible);
        }}>
        <View style={styles.protocolView}>
          <View style={styles.protocolModal}>
            <Pressable
                style={styles.buttonClose}
                onPress={() => setProtocolVisible(!protocolPopupVisible)}>
                <Icon name="close" size={20} color="black" />
              </Pressable>
            <Text style={styles.modalText}>Exchange protocol here</Text>
            <Pressable
              style={styles.buttonContact}
              onPress={() => { setProtocolVisible(!protocolPopupVisible); setContactVisible(!contactPopupVisible); }}>
              <Text style={styles.buttonText}>Contact Producer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactPopupVisible}
        onRequestClose={() => {
          setContactVisible(!contactPopupVisible);
        }}>
        <View style={styles.contactView}>
          <View style={styles.contactModal}>
          <Pressable
              style={styles.buttonClose}
              onPress={() => setContactVisible(!contactPopupVisible)}>
              <Icon name="close" size={20} color="black" />
            </Pressable>
            <Text style={styles.modalText}>Contact details here</Text>
          </View>
        </View>
      </Modal>
   </View>
  );
}

export { HomeScreen }
