import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * A react-native-maps Marker component, using passed Listing JSON data.
 * This component is called in the HomeScreen screen, where it creates markers to place on the map.
 * @param param0 Listing JSON, marker onPress callback, boolean value to determine if this marker is currently selected
 * @returns A react native maps Marker object
 */
const ListingMarker = ({ listing, onSelectMarker, isSelected }) => {
    return (
        <Marker
            coordinate={{latitude: parseFloat(listing.lat), longitude: parseFloat(listing.lon)}}
            onPress={() => {onSelectMarker(listing);}}
            key={listing.listing_ID}
        >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <View style={{flex:1, backgroundColor: 'white', borderRadius: 8, padding: 2}}>
                    <Text style={{
                            color:'darkgreen',
                            flex: 1,
                            fontWeight: isSelected ? 'bold' : 'normal',
                        }}
                    >
                        {listing.title}
                    </Text>
                </View>
                <Icon name="shopping-basket" size={25} color="green" style={{flex: 1}}/>
            </View>
        </Marker>
    )
}

export { ListingMarker }