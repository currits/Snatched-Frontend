import { React } from "react";
import {
	StyleSheet
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

/* Turns out PlatformColor is broken in Android - nevermind dark mode */

const dynamicBackgroundStyles = {
  /*...Platform.select({
    ios: {
      backgroundColor: PlatformColor('systemBackground'),
    },
    android: {
      //backgroundColor: PlatformColor('?android:attr/textColor'),
    },
    default: {backgroundColor: 'white'},
  }),*/
  backgroundColor: 'white'
};

const dynamicStyles = {
  /*...Platform.select({
    ios: {
      color: PlatformColor('label'),
    },
    android: {
      //color: PlatformColor('?android:attr/textColor'),
    },
    default: {color: 'black'},
  }),*/
  color: 'black'
};

const theme = {
  /*...Platform.select({
    ios: {
      primaryColor: PlatformColor('label'),
      secondaryColor: PlatformColor('secondaryLabel'),
    },
    android: {
      //primaryColor: PlatformColor('?android:attr/textColor'),
      //secondaryColor: PlatformColor('?android:attr/textColor'),
    },
    default: {secondaryColor: 'lightgray'},
  }),*/
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 32
  },
  centeredContainerWithHeader: {
    flex: 1,
    marginTop: -120,
    justifyContent: 'center',
    padding: 32
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 32
  }
});

export { appStyles, dynamicStyles, dynamicBackgroundStyles, theme }
