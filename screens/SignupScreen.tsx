import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { TextBox, Caption } from '../components/Text';
import { PrimaryButton } from '../components/Buttons';
import { appStyles } from '../components/Styles';

import { useAuth } from '../contexts/AuthContext';

const SignupScreen = ({ route, navigation }) => {
  const { isLoggedIn, login, logout } = useAuth();
  
  return (
    <View style={appStyles.container}>
      <Caption text="Create your Account" />

      <TextBox placeholder="Email" />
      <TextBox placeholder="Password" />
      <TextBox placeholder="Confirm Password" />

      <PrimaryButton
        text="Sign up"
        onPress={() => login()}
      />
      {/* Add more details here */}
    </View>
  );
};

export { SignupScreen }
