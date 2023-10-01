import { React, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking
} from 'react-native';

import { Snatched, TextBox, Caption, Hint } from '../components/Text';
import { PrimaryButton, Link } from '../components/Buttons';
import { appStyles } from '../components/Styles';

import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ route, navigation }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAvoidingView
      style={appStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={appStyles.centeredContainer}>
        {/* Extra View here to workaround to stop buggy keyboard sliding animation */}
        <View >
          <Snatched style={{textAlign: 'center'}} text="SNATCHED"/>
          <Caption text="Log into your Account" />

          <TextBox placeholder="Email" 
            onChangeText={setEmail}
            value={email}
          />
          <TextBox placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            style={{ marginBottom: 0 }}
          />
          <Link
            text="Forgot Password"
            style={{ marginBottom: 16, textAlign: "right", fontSize: 12, color: "gray" }}
            onPress={() => {
              Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfqBSbFNh4jS6z7nGxM6-7MOnuWTTITd3YkSJXoPD4o2TdnXA/viewform?usp=sf_link");
            }}  
          />
        </View>

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
