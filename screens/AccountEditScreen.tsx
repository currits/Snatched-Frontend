import { React, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAuth } from '../contexts/AuthContext';

import { appStyles } from '../components/Styles';
import { Header, Caption, Description, CaptionedTextBox } from '../components/Text';
import { PrimaryButton } from '../components/Buttons';

const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const AccountEditScreen = ({ route, navigation }) => {
  const { getJwt } = useAuth();
  const { userData, onUpdate } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: "My Account" })
  }, [navigation]);

  const [name, setName] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [phone, setPhone] = useState(userData?.phone);

  const [isLoading, setIsLoading] = useState(false);

  async function saveUserData() {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT + "/user", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        },
        body: JSON.stringify({
          "name": name,
          "email": email,
          "password": password,
          "phone": phone
        })
      });

      if (response.ok) {
        alert("Changes saved");
        // The API doesn't return the updated resource after the PUT is complete
        // Ideally it would send back the updated object
        // We get SettingsScreen to issue another GET request
      } else {
        throw await response.text();
      }
    }
    catch (error) {
      alert(error);
    }

    setIsLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView
        extraScrollHeight={Platform.OS === 'ios' ? -80 : 0} // Adjust as needed
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={appStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Header text="Edit Account Details"/>
            </View>
            <View style={{ flex: 1 }}>
                <CaptionedTextBox caption="Name" placeholder="Name"
                  value={name}
                  onChangeText={setName}/>
                <CaptionedTextBox caption="Email" placeholder="Email"
                  value={email}
                  onChangeText={setEmail}/>
                <CaptionedTextBox caption="Password" placeholder="Password" secureTextEntry={true}
                  value={password !== null ? password : "Password"}
                  onChangeText={setPassword}/>
                <CaptionedTextBox caption="Confirm Password" placeholder="Confirm Password" secureTextEntry={true}
                  value={confirmPassword !== null ? confirmPassword : "Password"}
                  onChangeText={setConfirmPassword}/>
                <CaptionedTextBox caption="Phone Number" placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <View style={appStyles.bottomContainer}>
        <PrimaryButton text="Update" isLoading={isLoading} onPress={saveUserData}/>
      </View>
    </View>
  );
};

export { AccountEditScreen }
