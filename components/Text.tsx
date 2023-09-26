import { React } from "react";
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
	},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
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

const Snatched = ({ text, style }) => {
	return (
		<Text style={[style, styles.snatched]}>{text}</Text>
	)
}

const Title = ({ text, style }) => {
	return (
		<Text style={[style, styles.title]}>{text}</Text>
	)
}

const Caption = ({ text, style }) => {
	return (
    <Text style={[style, styles.caption]}>{text}</Text>
	)
}

const Hint = ({ text, style }) => {
	return (
    <Text style={[style, styles.hint]}>{text}</Text>
	)
}

const CaptionedTextBox = ({ caption, placeholder, value, style }) => {
	return (
		<>
    <Text style={styles.caption}>{caption}</Text>
		<TextInput style={[style, styles.input]} placeholder={placeholder} value={value}/>
		</>
	)
}

const TextBox = ({ placeholder, value, style }) => {
	return (
		<TextInput style={[style, styles.input]} placeholderTextColor="gray" placeholder={placeholder} value={value} />
	)
}

export { Snatched, Title, Caption, Hint, TextBox, CaptionedTextBox }
