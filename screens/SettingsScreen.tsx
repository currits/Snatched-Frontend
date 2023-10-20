import { React, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { useAuth } from '../contexts/AuthContext';

import { version } from "../package.json"
import { appStyles } from '../components/Styles';
import { LogoutAlert } from '../components/LogoutAlert';
import { DynamicIcon, Header, Caption, Description, CaptionedTextBox } from '../components/Text';
import { PrimaryButton, Link } from '../components/Buttons';

const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const SettingsScreen = ({ route, navigation }) => {
  const { logout, getJwt } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: "Settings" })
  }, [navigation]);

  //const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //const [isEnabled, setIsEnabled] = useState(false);

  const [userData, setUserData] = useState(null);
  const [isRefreshing, setRefreshing] = useState(false);

  // Get the user data from the API upon rendering this screen
  async function getUserData() {
    try {
      const response = await fetch(API_ENDPOINT + "/user", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        }
      });

      if (response.ok) {
        return response.json();
      } else {
        throw await response.text();
      }
    }
    catch (error) {
      alert(error);
    }

  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData().then((data) => {
        setUserData(data);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    getUserData().then((data) => {
      setUserData(data);
    });
    
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1}}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={appStyles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Header text="My Account"/>
          { userData &&
            <Pressable onPress={() => { navigation.navigate('AccountEditScreen', { userData }) }}>
                <DynamicIcon name="edit" size={20} />
            </Pressable>
          }
        </View>
        <View>
          <CaptionedTextBox caption="Name" placeholder="Name" isLoading={!userData} value={userData?.username} editable={false}/>
          <CaptionedTextBox caption="Email" placeholder="Email" isLoading={!userData} value={userData?.email} editable={false}/>
          <CaptionedTextBox caption="Password" placeholder="Password" isLoading={!userData} value="password" secureTextEntry={true} editable={false}/>
          <CaptionedTextBox caption="Phone Number" placeholder="Phone Number" isLoading={!userData} value={userData?.phone} editable={false}/>
        </View>

        <View style={{ flex: 1 }}>
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
      </View>
      <View style={appStyles.bottomContainer}>
        <Description text="Snatched App"/>
        <Header text={"v" + version}/>
      </View>
    </ScrollView>
  );
};

export { SettingsScreen }
