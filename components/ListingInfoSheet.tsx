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
import { PrimaryButton, SecondaryButton } from '../components/Buttons';

const ListingInfoSheet = ({item, onInfoPress, onSnatchPress}) => {
	const styles = StyleSheet.create({
		contentContainer: {
			flex: 1,
			alignItems: 'flex-start',
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
			marginStart: 20
		},
		descText:{
			flex : 3,
			fontSize: 14,
			marginStart: 20
		}
	});

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
			<Text style={{
				fontSize: 24,
				fontWeight: 'bold',
				marginBottom: 15,
				marginStart: 20
			}}>
				Listing Information
			</Text>
			<View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>
				<Text style={styles.titleText}>{item.title}</Text>
				{userCoords && <Text style={{flex: 1, fontSize: 14, justifyContent: 'flex-end'}}>{(getDistance(userLocation, targetCoords, 100)/1000)}km</Text>}
			</View>
			<Text style={styles.descText}>{item.description}</Text>
			<View style={styles.buttonContainer}>
				<SecondaryButton onPress={onInfoPress} text="More Info" style={{ margin: 12 }}/>
				<PrimaryButton onPress={onSnatchPress} text="Snatch!" style={{ margin: 12, flex: 2 }}/>
			</View>
		</View>
	)
}

export default ListingInfoSheet;
