import { React, useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	Button,
} from "react-native";

import { getDistance } from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import { Title, Caption, Description } from '../components/Text';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';


/**
 * A formatted component that contains the formatted content for a BottomSheet component on the HomeScreen screen.
 * It can use three params; the listing JSON, and two callback functions for each button.
 * This component makes requests to Geolocation service to calculate distance.
 * @param param0 Listing JSON, Info press callback, Snatch press callback
 * @returns A view containing bottom sheet content
 */
const ListingInfoSheet = ({item, onInfoPress, onSnatchPress}) => {
	const styles = StyleSheet.create({
		contentContainer: {
			flex: 1,
			alignItems: 'flex-start',
			paddingTop: 0,
			padding: 25
		},
		buttonContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
			flex: 2,
		},
		titleText:{
			flex: 3,
			fontWeight: 'bold',
			fontSize: 14,
		}
	});

	// Here we get user location to make distance to listing calculation
	const [userCoords, setUserCoords] = useState(null);
	useEffect(() => {
		Geolocation.getCurrentPosition(
			position => {
				var coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
				setUserCoords(coords);
				console.log(position);
				console.log(userCoords);
			},
			error => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	}, []);

	var targetCoords = {latitude: parseFloat(item.lat), longitude: parseFloat(item.lon)}
	var userLocation = userCoords;

	return (
		<View style={styles.contentContainer}>

			<Title style={{
				marginBottom: 20
			}} text="Listing Information"/>
			<View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>
				<Caption text={item.title} style={styles.titleText}/>
				{userCoords && <Text style={{flex: 1, fontSize: 14, justifyContent: 'flex-end'}}>{(getDistance(userLocation, targetCoords, 100)/1000)}km</Text>}
			</View>

			<Description text={item.description}/>
			
			<View style={styles.buttonContainer}>
				<SecondaryButton onPress={onInfoPress} text="More Info" style={{ marginEnd: 6 }}/>
				<PrimaryButton onPress={onSnatchPress} text="Snatch!" style={{ marginStart: 6, flex: 2 }}/>
			</View>
		</View>
	)
}

export default ListingInfoSheet;
