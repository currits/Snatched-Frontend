import React, {useEffect, useRef, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Button
} from 'react-native';
import { PrimaryButton } from '../components/Buttons';

/**
 * Screen for selecting an address by dropping on a pin on a map.
 * Used in creating and editing a user's own listings.
 * Makes requests to geolocation
 * @param param0 Route, Navigation, null
 * @returns LocationSelect screen
 */
function LocationSelectScreen({ route, navigation, onSubmit }) {
    const { address } = route.params;
    // As this screen be navigated to from two different routes, we need to find where we came from to properly return to after
    // Cannot use goBack() method, must pass data along to previous screen
    const { returnScreen } = route.params;

    // State for dropping a pin
    const [marker, setMarker] = useState(null);
    // State for keeping an updated set of coords from user dropped markers
    const [returnCoord, setReturnCoords] = useState(null);
    // Map ref to be able to manipulate the mapview component.
    const mapRef = useRef();

    // On load, get center the camera on the user
    useEffect(() => {
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
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }, []);

    // Method for creating a marker when the user taps
    const makeMarker = (lat, lon, callback) => {
        return(
            <Marker
            coordinate={{latitude: lat, longitude: lon}}
            onPress={e => callback}
            >
            </Marker>
        );
    }

    // Method for removing old marker when new marker is made
    const clearMarker = () => {
        setMarker(null);
    }

    // Method to drop markers when the user taps, record the tapped location for return
    const tapMap = (latlng) => {
        clearMarker();
        var marker = makeMarker(latlng.coordinate.latitude, latlng.coordinate.longitude, clearMarker);
        setMarker(marker);
        setReturnCoords({
            latitude: latlng.coordinate.latitude,
            longitude: latlng.coordinate.longitude
        });
        mapRef.current?.animateCamera({
            center: {
                latitude: latlng.coordinate.latitude,
                longitude: latlng.coordinate.longitude
            }
        });
    }

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
                onPress={e => tapMap(e.nativeEvent)}
                onPoiClick={e => tapMap(e.nativeEvent)}
            >
            {marker ? marker : null}
            </MapView>
            {/* Note that because the screen that navigate here need a passed item in the route, we must also require it to be passed to this screen, to then pass it back. Hot potato. */}
            <PrimaryButton text={"Confirm"} style={styles.button} onPress={() => {navigation.navigate(returnScreen, {returnCoord: returnCoord, item: route.params.item})}}></PrimaryButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    button: {
        marginBottom: 50,
        width: '50%'
    }
});

export { LocationSelectScreen }