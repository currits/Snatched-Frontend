import { React, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  Pressable
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useAuth } from '../contexts/AuthContext';

import { version } from "../package.json"
import { appStyles } from '../components/Styles';
import { LogoutAlert } from '../components/LogoutAlert';
import { Header, Caption, Description, CaptionedTextBox } from '../components/Text';
import { PrimaryButton, Link } from '../components/Buttons';

const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const getUserData = async () => {
  const { getJwt } = useAuth();

  console.log(await getJwt());

  try {
    const response = await fetch(API_ENDPOINT + "/user", {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Basic' + await getJwt()
        }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw await response.text();
    }
  }
  catch (error) {
    alert(error);
  }
};

const SettingsScreen = ({ route, navigation }) => {
  const { logout } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: "Settings" })
  }, [navigation]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const userData = getUserData();

  return (
    <View style={{ flex: 1 }}>
      <View style={appStyles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Header text="My Account"/>
          <Pressable>
            <Icon name="edit" size={20} color="black"/>
          </Pressable>
        </View>
        <CaptionedTextBox caption="Email" placeholder="Email" value={{ userData }} editable={false}/>
        <CaptionedTextBox caption="Password" placeholder="Password" value="password" secureTextEntry={true} editable={false}/>
        <CaptionedTextBox caption="Phone Number" placeholder="Phone Number" editable={false}/>

        <Header text="App Settings"/>
        {/* We don't have push notifications, so just commenting this setting out */}
        {/*
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Description text="Push Notifications"/>
          <Switch
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        */}
        <Link text="About Snatched" onPress={() => { navigation.navigate('AboutScreen') }}/>
        <Link text="Log Out" onPress={() => { LogoutAlert(logout) }}/>
      </View>
      <View style={appStyles.bottomContainer}>
        <Text>Snatched App</Text>
        <Header text={"v" + version}/>
      </View>
    </View>
  );
};

export { SettingsScreen }
