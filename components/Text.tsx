import React, { forwardRef } from "react";
import {
	StyleSheet,
	Text,
	TextInput
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

import { dynamicStyles } from "./Styles";

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
  input: {
  	...dynamicStyles,
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 0,

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

const Snatched = ({ text, style }) => {
	return (
		<Text style={[styles.snatched, style]}>{text}</Text>
	)
}

const SmallSnatched = ({ style }) => {
	return (
		<Text style={[styles.snatchedSmall, style]}>SNATCHED</Text>
	)
}

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

const CaptionedTextBox = forwardRef(({ caption, ...props }, ref) => {
	return (
		<>
    <Text style={styles.caption}>{caption}</Text>
		<TextInput ref={ref} placeholderTextColor="gray" {...props} style={[styles.input, props.style]} />
		</>
	)
});

const TextBox = forwardRef(({ ...props }, ref) => {
	return (
		<TextInput ref={ref} placeholderTextColor="gray" {...props} style={[styles.input, props.style]} />
	)
});

export { DynamicIcon, Snatched, SmallSnatched, Title, Header, Caption, Description, Hint, TextBox, CaptionedTextBox }
