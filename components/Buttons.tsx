import { React } from "react";
import {
	StyleSheet,
	Text,
	Pressable,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    	marginTop: 12
	}
});

const buttonHelperStyles = StyleSheet.create({
  bottomButtonContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const PrimaryButton = ({ text, icon, onPress, style, styleText }) => {
	return (
		<Pressable onPress={onPress} style={[styles.button, styles.buttonPrimary, style]}>
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

const SecondaryButton = ({ text, icon, onPress, style, styleText }) => {
	return (
		<Pressable onPress={onPress} style={[styles.button, styles.buttonSecondary, style]}>
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
			style={[style, styles.link]}
			onPress={onPress}
		>
			{text}
		</Text>
	)
}

export { PrimaryButton, SecondaryButton, Link, buttonHelperStyles }