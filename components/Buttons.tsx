import { React } from "react";
import {
	StyleSheet,
	Text,
	Pressable,
	ActivityIndicator
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

import { dynamicStyles } from "./Styles";

/*
This component contians the declarations and styling for the various buttons used in the app.
Uses React native pressable module as a base.
*/

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
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		height: 40,
		borderRadius: 5,
		paddingVertical: 8,
		paddingHorizontal: 32,
		marginTop: 12,
		
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	buttonPrimary: {
		backgroundColor: 'dimgray',
	},
	buttonSecondary: {
		backgroundColor: 'darkgray',
	},
	buttonPrimaryText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
	buttonIcon: {
		marginLeft: 10
	},
	link: {
  		...dynamicStyles,
    	marginTop: 12
	}
});

const PrimaryButton = ({ text, isLoading, icon, style, styleText, ...props }) => {
	return (
		<Pressable {...props} style={[styles.button, styles.buttonPrimary, style]} disabled={isLoading}>
			{isLoading ? (
				<ActivityIndicator />
      		) : (
      			<>
					<Text style={[styles.buttonPrimaryText, styleText]}>{text}</Text>
					{icon &&
						<Icon
							style={styles.buttonIcon}
							name={icon}
							size={20}
							color="#FFF"
						/>
					}
				</>
			)}
		</Pressable>
	)
}

const SecondaryButton = ({ text, icon, style, styleText, ...props }) => {
	return (
		<Pressable {...props} style={[styles.button, styles.buttonSecondary, style]}>
			<Text style={[styles.buttonPrimaryText, styleText]}>{text}</Text>
			{icon &&
				<Icon
					style={styles.buttonIcon}
					name={icon}
					size={20}
					color="#FFF"
				/>
			}
		</Pressable>
	)
}

const Link = ({ text, onPress, style }) => {
	return (
		<Text
			style={[styles.link, style]}
			onPress={onPress}
		>
			{text}
		</Text>
	)
}

export { PrimaryButton, SecondaryButton, Link }
