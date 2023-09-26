import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import { TextBox, Caption } from '../components/Text';
import { PrimaryButton } from '../components/Buttons';
import { appStyles } from '../components/Styles';

import { useAuth } from '../contexts/AuthContext';

const SignupScreen = ({ route, navigation }) => {
  const { isLoggedIn, login, logout } = useAuth();
  
  return (
    <KeyboardAvoidingView
      style={appStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={appStyles.centeredContainerWithHeader}>
        {/* Extra View here to workaround to stop buggy keyboard sliding animation */}
        <View>
          <Caption text="Create your Account" />
        </View>

        <TextBox placeholder="Email" />
        <TextBox placeholder="Password" />
        <TextBox placeholder="Confirm Password" />

        <PrimaryButton
          text="Sign up"
          onPress={() => login()}
        />
        {/* Add more details here */}
      </View>
    </KeyboardAvoidingView>
  );
};

export { SignupScreen }
