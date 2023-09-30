import { React, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';

import { Snatched, TextBox, Caption, Hint } from '../components/Text';
import { PrimaryButton, Link } from '../components/Buttons';
import { appStyles } from '../components/Styles';

import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ route, navigation }) => {
  const { login } = useAuth();

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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

        <TextBox placeholder="Email" 
          onChangeText={onChangeEmail}
          value={email} />
        <TextBox placeholder="Password"
          secureTextEntry={true}
          onChangeText={onChangePassword}
          value={password} />

        <PrimaryButton
          text="Sign in"
          isLoading={isLoading}
          onPress={async () => {
            try {
              setIsLoading(true); // Set loading to true, disabling the button.
              await login(email, password);
            } catch (error) {
              alert('API error: ' + error);
            } finally {
              setIsLoading(false); // Set loading to false, enabling the button.
            }
          }}
        />

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Hint text="Don't have an account? " style={{ marginTop: 12 }}/>
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
