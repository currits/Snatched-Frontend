import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { TextBox, Caption, Hint } from '../components/Text';
import { PrimaryButton, Link } from '../components/Buttons';
import { appStyles } from '../components/Styles';

import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ route, navigation }) => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <View style={[appStyles.centeredContainer]}>
      <Caption text="Log into your Account" />

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
  );
};

export { LoginScreen }
