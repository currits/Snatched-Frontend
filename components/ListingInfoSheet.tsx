import { React } from "react";
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	Button
} from "react-native";

import { Title, Caption, Description } from '../components/Text';
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
			<Title style={{
				marginBottom: 20
			}} text="Listing Information"/>

			<View style={{  }}>
				<Caption text={item.title}/>
				<Description text={item.description}/>
			</View>

			<View style={styles.buttonContainer}>
				<SecondaryButton onPress={onInfoPress} text="More Info" style={{ margin: 12 }}/>
				<PrimaryButton onPress={onSnatchPress} text="Snatch!" style={{ margin: 12, flex: 2 }}/>
			</View>
		</View>
	)
}

export default ListingInfoSheet;
