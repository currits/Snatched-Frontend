import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListingMarker = ({ listing, onSelectMarker, isSelected }) => {
    return (
        <Marker
            coordinate={{latitude: parseFloat(listing.lat), longitude: parseFloat(listing.lon)}}
            //this for now just logs the marker (or text above) being pressed. later this can be used as the call to go to the listing details for this marker.
            //onCalloutPress={e =>(onSelectMarker(listing))}
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
    //we will need to decide if we want to have text floating above markers, saying what the listing is, when they are drwan or have to make the user
    //click on each one.
    //if we do, we'll need to do our own marker SVG (any addition of text means replacing default marker graphics with custom SVG + the text) <- this will be easiest i imagine
    //nonetheless, should look at instead finding a way to call showCallout() on marker list to make them show their callouts. would need to be able to handle: markers moving off and back on screen, markers outside the screen coming onto the screen (isVisible flag? how in react?)
}

export { ListingMarker }