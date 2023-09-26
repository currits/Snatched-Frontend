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

const SettingsScreen = ({ route, navigation }) => {
  const { logout } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: "Settings" })
  }, [navigation]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{ flex: 1 }}>
      <View style={appStyles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Header text="My Account" style={{ marginBottom: 12 }}/>
          <Pressable>
            <Icon name="edit" size={20} color="black"/>
          </Pressable>
        </View>
        <CaptionedTextBox caption="Email" placeholder="Email" editable={false}/>
        <CaptionedTextBox caption="Password" placeholder="Password" secureTextEntry={true} editable={false}/>
        <CaptionedTextBox caption="Phone Number" placeholder="Password" editable={false}/>

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
