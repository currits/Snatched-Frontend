import { React } from "react";
import {
	StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export { appStyles }
