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

function LocationSelectScreen({ route, navigation, onSubmit }) {
    const { address } = route.params;
    const { returnScreen } = route.params;

    const [marker, setMarker] = useState(null);
    const [returnCoord, setReturnCoords] = useState(null);
    const mapRef = useRef();

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

    const makeMarker = (lat, lon, callback) => {
        return(
            <Marker
            coordinate={{latitude: lat, longitude: lon}}
            onPress={e => callback}
            >
            </Marker>
        );
    }

    const clearMarker = () => {
        setMarker(null);
    }

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