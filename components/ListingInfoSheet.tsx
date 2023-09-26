import { React, useRef, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	Button
} from "react-native";

const ListingInfoSheet = ({item, onInfoPress, onSnatchPress}) => {
	const styles = StyleSheet.create({
		contentContainer: {
			flex: 1,
			alignItems: 'center',
		},
		buttonContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
			height: '50%',
		},
		buttonMoreInfo: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			height: 50,
			borderRadius: 5,
			paddingVertical: 12,
			paddingHorizontal: 32,
			elevation: 3,
			backgroundColor: 'darkgray',
			marginHorizontal: 8,
		},
		buttonSnatch: {
			flex: 2,
			alignItems: 'center',
			justifyContent: 'center',
			height: 50,
			borderRadius: 5,
			paddingVertical: 12,
			paddingHorizontal: 32,
			elevation: 3,
			backgroundColor: 'dimgray',
			marginHorizontal: 8,
		},
		buttonText: {
			fontSize: 16,
			lineHeight: 21,
			fontWeight: 'bold',
			letterSpacing: 0.25,
			color: 'white',
		}
	});

	return (
		<View style={styles.contentContainer}>
			<Text style={{
				fontSize: 24,
				fontWeight: 'bold',
				marginBottom: 20
			}}>
				Listing Information
			</Text>
			<Text>{item.name}</Text>
			<Text>{item.description}</Text>
			<View style={styles.buttonContainer}>
				<Pressable onPress={onInfoPress} style={styles.buttonMoreInfo}>
					<Text style={styles.buttonText}>More Info</Text>
				</Pressable>
				<Pressable onPress={onSnatchPress} style={styles.buttonSnatch}>
					<Text style={styles.buttonText}>Snatch!</Text>
				</Pressable>
			</View>
		</View>
	)
}

export default ListingInfoSheet;
