import React, { forwardRef } from "react";
import {
	StyleSheet,
	Text,
	TextInput, 
	View,
	Pressable
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

import { dynamicStyles } from "./Styles";

/*
This component holds various pre-styles text components that are used throughout the app.
 */

const styles = StyleSheet.create({
	snatched: {
  	...dynamicStyles,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 32
	},
	snatchedSmall: {
  	...dynamicStyles,
		fontSize: 30,
		fontWeight: 'bold'
	},
  title: {
  	...dynamicStyles,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12
  },
  header: {
  	...dynamicStyles,
    fontSize: 20,
  },

  caption: {
  	...dynamicStyles,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
  	...dynamicStyles,
    fontSize: 16,
    marginTop: 8,
  },
  multilineInput : {
  	paddingTop: 10
  },
  input: {
  	...dynamicStyles,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: 'white',

    height: 40,
    marginTop: 12,
    marginBottom: 12,

    textAlignVertical: 'top',
    paddingLeft: 16,

    // Shadows
    /* iOS
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84, */

		elevation: 5,
  },
  hint: {
  	...dynamicStyles,
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7
  }
});

/* Style should always go at end of {[]} style array to ensure argument-defined styles take precedence */

const DynamicIcon = ({ ...props }) => {
	/*return (
		<Icon color={Platform.select({
		    ios: PlatformColor('label'),
		    android: PlatformColor('?android:attr/textColor'),
		    default: 'black'
		  })} {...props} />
	)*/
	return (
		<Icon {...props} />
	)
}

/**
 * The word 'Snatched' in a large font, suitable for branding pages
 */
const Snatched = ({ text, style }) => {
	return (
		<Text style={[styles.snatched, style]}>{text}</Text>
	)
}

/**
 * The word 'Snatched' in a medium font, suitable for subtle branding, such as the drawer
 */
const SmallSnatched = ({ style }) => {
	return (
		<Text style={[styles.snatchedSmall, style]}>SNATCHED</Text>
	)
}

// These are all different styles of text used throughout various screens
// for consistency
const Title = ({ text, style }) => {
	return (
		<Text style={[styles.title, style]}>{text}</Text>
	)
}

const Header = ({ text, style }) => {
	return (
    <Text style={[styles.header, style]}>{text}</Text>
	)
}

const Caption = ({ text, style }) => {
	return (
    <Text style={[styles.caption, style]}>{text}</Text>
	)
}

const Description = ({ text, style }) => {
	return (
    <Text style={[styles.description, style]}>{text}</Text>
	)
}

const Hint = ({ text, style }) => {
	return (
    <Text style={[styles.hint, style]}>{text}</Text>
	)
}

/**
 * A textbox with a text caption above it
 * May accept an icon button to the left of the texbox
 */
const CaptionedTextBox = forwardRef(({ caption, icon, iconColor, onIconPress, ...props }, ref) => {
	return (
		<>
    <Text style={styles.caption}>{caption}</Text>
    {icon ? (
			<View style={{flexDirection: 'row'}}>
				<TextBox ref={ref} {...props} style={[ props.style, { flex: 6 }]}/>
	    	<Pressable
					onPress={onIconPress}
					style={{ flex:1, alignSelf: 'center' }}
				>
					<Icon name={icon} size={50} color={iconColor}/>
				</Pressable>
			</View>
    ) : (
			<TextBox ref={ref} {...props} />
		)}
		</>
	)
});

/**
 * A textbox styled appropriately, may include "Loading..." placeholder text
 */
const TextBox = forwardRef(({ isLoading, ...props }, ref) => {
	const inputStyles = [
    styles.input, // Default style
    props.style, // Any additional styles passed in props
  ];

  if (props.multiline) {
    inputStyles.push(styles.multilineInput);
  }

	return (
		<TextInput ref={ref} {...props}
			placeholder={isLoading ? "Loading..." : props.placeholder}
			value={isLoading ? "" : props.value}
			style={inputStyles}
		/>
	)
});

export { DynamicIcon, Snatched, SmallSnatched, Title, Header, Caption, Description, Hint, TextBox, CaptionedTextBox }
