import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import { Snatched, TextBox, Caption } from '../components/Text';
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
        {/* Extra Views here to workaround to stop buggy keyboard sliding animation */}
        <View style={{alignItems: 'center'}}>
          <Snatched text="SNATCHED"/>
        </View>
        <View>
          <Caption text="Create your Account" />
        </View>

        <TextBox placeholder="Email" />
        <TextBox placeholder="Password" secureTextEntry={true} />
        <TextBox placeholder="Confirm Password" secureTextEntry={true} />

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
