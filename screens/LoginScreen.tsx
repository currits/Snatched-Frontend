import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import { Snatched, TextBox, Caption, Hint } from '../components/Text';
import { PrimaryButton, Link } from '../components/Buttons';
import { appStyles } from '../components/Styles';

import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ route, navigation }) => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <KeyboardAvoidingView
      style={appStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={appStyles.centeredContainer}>
        {/* Extra Views here to workaround to stop buggy keyboard sliding animation */}
        <View style={{alignItems: 'center'}}>
          <Snatched text="SNATCHED"/>
        </View>
        <View>
          <Caption text="Log into your Account" />
        </View>

        <TextBox placeholder="Email" />
        <TextBox placeholder="Password" />

        <PrimaryButton
          text="Sign in"
          onPress={() => login()}
        />

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Hint text="Don't have an account? "/>
          <Link
            text="Sign up"
            onPress={() => navigation.push('SignupScreen')}
          />
        </View>
        {/* Add more details here */}
      </View>
    </KeyboardAvoidingView>
  );
};

export { LoginScreen }
