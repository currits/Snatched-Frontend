import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

function CreateMarker(listing, displayListingInfo) {
    //this is barebones for now and subject to change
    //operates on the assumption that each marker will be created by being passed in a JSON array with the details from the DB
    //and that it will have fields lat, long, title, desc, and a unique key (used to make a request to the DB for viewing the listing in detail, and for react to identify array siblings)

    return (
        <Marker
            coordinate={{latitude: listing.lat, longitude: listing.lon}}
            title={listing.title}
            //this for now just logs the marker (or text above) being pressed. later this can be used as the call to go to the listing details for this marker.
            onCalloutPress={e =>(displayListingInfo(listing))}
            onPress={e =>(displayListingInfo(listing))}
            key={listing.id}
        >
        <Callout>
            <View>
                <Text>{listing.title}</Text>
            </View>
        </Callout>
    </Marker>)
    //we will need to decide if we want to have text floating above markers, saying what the listing is, when they are drwan or have to make the user
    //click on each one.
    //if we do, we'll need to do our own marker SVG (any addition of text means replacing default marker graphics with custom SVG + the text) <- this will be easiest i imagine
    //nonetheless, should look at instead finding a way to call showCallout() on marker list to make them show their callouts. would need to be able to handle: markers moving off and back on screen, markers outside the screen coming onto the screen (isVisible flag? how in react?)
}

export { CreateMarker }