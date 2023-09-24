import React, {useCallback, useMemo, useRef, useState} from 'react';
import { CreateMarker } from './CreateMarker';
import BottomSheet from '@gorhom/bottom-sheet'

import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  Pressable
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

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
    height: '75%',
  },
  button1: {
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
  button2: {
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
  }
});

function HomeScreen() {
  
  //    Bottom Sheet Code   //
  //below is the code for the menu that can be dragged up from the bottom of the interface.
  //we will use it to display listing info when a makrer is tapped
  const bottomSheetRef = useRef<BottomSheet>(null);
  //memo is a thing that lets a component not be rerendered when its parent is rerendered -> optimisation
  const snapPoints = useMemo(() => ['3%', '35%'], []);
  
  //retaining this code from bottomsheet usage description for now
  //we likely wont have use for tracking bottomsheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);}, []);
  
  //this function is passed to each marker, so that when a marker is tapped it sends back up it's listing data for us to populate the bottom sheet
  //we will use the buttons to open detailed listing views etc
  const displayListingInfo = (title, desc) => {
    bottomSheetRef.current.expand();
    setBottomSheetContent(
    <View style={styles.contentContainer}>
      <Text>{title}</Text>
      <Text>{desc}</Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => Alert.alert('More info pressed')} style={styles.button1}>
          <Text style={styles.buttonText}>More Info</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert('Snatch pressed')} style={styles.button2}>
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
      bottomSheetRef.current.collapse();
    setRequestCenter(newCenter);
    //here we would use setMarkers to change the list of markers we need to display and it s h o u l d update on map on its own if im interpreting states right
  }

  //added lines for logging on map ready and on region change complete events
  return (
    <View style={styles.container}>
     <MapView
       style={styles.map}
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
        onChange={handleSheetChanges}
      >
        {bottomSheetContent}
      </BottomSheet>
   </View>
  );
}

export { HomeScreen }
