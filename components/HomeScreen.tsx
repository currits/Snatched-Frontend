import React from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import MapView from 'react-native-maps';

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
     </MapView>
   </View>
  );
}

export { HomeScreen }
