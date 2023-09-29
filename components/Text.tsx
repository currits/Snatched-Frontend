import React, { forwardRef } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
	snatched: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 32
	},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12
  },
  header: {
    fontSize: 20,
  },

  caption: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  input: {
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
    marginTop: 12,
  	color: 'gray'
  }
});

/* Style should always go at end of {[]} style array to ensure argument-defined styles take precedence */

const Snatched = ({ text, style }) => {
	return (
		<Text style={[styles.snatched, style]}>{text}</Text>
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
    <Text style={[styles.Description, style]}>{text}</Text>
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
		<TextInput ref={ref} style={[styles.input, props.style]} {...props} />
		</>
	)
});

const TextBox = forwardRef(({ ...props }, ref) => {
	return (
		<TextInput ref={ref} style={[styles.input, props.style]} {...props} />
	)
});

export { Snatched, Title, Header, Caption, Description, Hint, TextBox, CaptionedTextBox }
