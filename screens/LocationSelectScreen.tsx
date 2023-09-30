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

function LocationSelectScreen({ route, navigation }) {
    //const { address } = route.params;

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

    const tapMap = (lat, lon) => {
        clearMarker();
        var marker = makeMarker(lat, lon, clearMarker);
        setMarker(marker);
        mapRef.current?.animateCamera({
            center: {
                latitude: lat,
                longitude: lon
            },
            zoom: 14,
        });
    }

    const handleMapMove = (newCenter) => {
        setReturnCoords({
            latitude: newCenter.latitude,
            longitude: newCenter.longitude
        });
    }

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
            >
            </MapView>
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
    }
});

export { LocationSelectScreen }