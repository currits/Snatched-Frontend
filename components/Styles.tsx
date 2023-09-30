import { React } from "react";
import {
	StyleSheet,
  Platform,
  PlatformColor
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

const dynamicBackgroundStyles = {
  ...Platform.select({
    ios: {
      backgroundColor: PlatformColor('systemBackground'),
    },
    android: {
      backgroundColor: PlatformColor('?android:attr/textColor'),
    },
    default: {backgroundColor: 'white'},
  }),
};

const dynamicStyles = {
  ...Platform.select({
    ios: {
      color: PlatformColor('label'),
    },
    android: {
      color: PlatformColor('?android:attr/textColor'),
    },
    default: {color: 'black'},
  }),
};

const theme = {
  ...Platform.select({
    ios: {
      primaryColor: PlatformColor('label'),
      secondaryColor: PlatformColor('secondaryLabel'),
    },
    android: {
      primaryColor: PlatformColor('?android:attr/textColor'),
      secondaryColor: PlatformColor('?android:attr/textColor'),
    },
    default: {secondaryColor: 'lightgray'},
  }),
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
    marginBottom: 48,
    alignItems: 'center',
  }
});

export { appStyles, dynamicStyles, dynamicBackgroundStyles, theme }
