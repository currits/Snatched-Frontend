import { React, useState } from "react";
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
  const { signup } = useAuth();

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  
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

        <TextBox placeholder="Email" 
          onChangeText={onChangeEmail}
          value={email} />
        <TextBox placeholder="Password"
          secureTextEntry={true}
          onChangeText={onChangePassword}
          value={password} />
        <TextBox placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={onChangeConfirmPassword}
          value={confirmPassword} />

        <PrimaryButton
          text="Sign up"
          isLoading={isLoading}
          onPress={async () => {
            if (password !== confirmPassword) {
              alert("Passwords don't match");
              return;
            }

            try {
              setIsLoading(true); // Set loading to true, disabling the button.
              await signup(email, password);
            } catch (error) {
              alert('API error: ' + error);
            } finally {
              setIsLoading(false); // Set loading to false, enabling the button.
            }
          }}
        />
        {/* Add more details here */}
      </View>
    </KeyboardAvoidingView>
  );
};

export { SignupScreen }
