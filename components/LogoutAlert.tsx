import { React } from "react";
import {
  Alert
} from "react-native";

import { useAuth } from '../contexts/AuthContext';

const LogoutAlert = (logout) => {
  return Alert.alert(
    "Are you sure?",
    "Are you sure you want to log out?",
    [
      // Does nothing but dismiss the dialog when tapped
      {
        text: "Cancel",
      },
      {
        text: "Log out",
        style: 'destructive',
        onPress: logout,
      },
    ]
  );
}

export { LogoutAlert }
