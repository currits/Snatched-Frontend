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

const CaptionedTextBox = ({ caption, placeholder, value, editable, secureTextEntry, style }) => {
	return (
		<>
    <Text style={styles.caption}>{caption}</Text>
		<TextInput style={[styles.input, style]} editable={editable} secureTextEntry={secureTextEntry} placeholder={placeholder} value={value}/>
		</>
	)
}

const TextBox = ({ placeholder, value, editable, secureTextEntry, style }) => {
	return (
		<TextInput style={[styles.input, style]} editable={editable} secureTextEntry={secureTextEntry} placeholderTextColor="gray" placeholder={placeholder} value={value} />
	)
}

export { Snatched, Title, Header, Caption, Description, Hint, TextBox, CaptionedTextBox }
