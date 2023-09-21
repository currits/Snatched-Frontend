import React, {useState} from 'react';
import { CreateMarker } from './CreateMarker';

import {
  StyleSheet,
  View
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
});

function HomeScreen() {
  const dudMarkers = [{latitude: -37.78825, longitude: 175.289350, title:'test one', desc:'test 1 desc', id: 1},
  {latitude: -36.78825, longitude: 176.289350, title:'test two', desc:'test 2 desc', id: 2},
  {latitude: -38.78825, longitude: 174.289350, title:'test three', desc:'test 3 desc', id: 3},
  {latitude: -37.78825, longitude: 177.289350, title:'test four', desc:'test 4 desc', id: 4},
  {latitude: -35.78825, longitude: 175.289350, title:'test five', desc:'test 5 desc', id: 5},
  {latitude: -34.78825, longitude: 175.289350, title:'test six', desc:'test 6 desc', id: 6}]

  const [markers, setMarkers] = useState(dudMarkers);
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
     >
      {markers.map(r => CreateMarker(r))}
     </MapView>
   </View>
  );
}

export { HomeScreen }
