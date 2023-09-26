import { React } from "react";
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	Button
} from "react-native";

import { PrimaryButton, SecondaryButton } from '../components/Buttons';

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
				<SecondaryButton onPress={onInfoPress} text="More Info"/>
				<PrimaryButton onPress={onSnatchPress} text="Snatch!" style={{ flex: 2 }}/>
			</View>
		</View>
	)
}

export default ListingInfoSheet;
