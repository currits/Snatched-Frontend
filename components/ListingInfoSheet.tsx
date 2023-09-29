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
			alignItems: 'flex-start',
		},
		buttonContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
			flex: 2,
		},
		titleText:{
			flex: 1,
			fontWeight: 'bold',
			fontSize: 14,
			marginBottom: 15,
			marginStart: 20
		},
		descText:{
			flex : 4,
			fontSize: 14,
			marginStart: 20
		}
	});

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
			<Text style={styles.titleText}>{item.title}</Text>
			<Text style={styles.descText}>{item.description}</Text>
			<View style={styles.buttonContainer}>
				<SecondaryButton onPress={onInfoPress} text="More Info" style={{ margin: 12 }}/>
				<PrimaryButton onPress={onSnatchPress} text="Snatch!" style={{ margin: 12, flex: 2 }}/>
			</View>
		</View>
	)
}

export default ListingInfoSheet;
