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

import { Header, Caption, Description, CaptionedTextBox } from '../components/Text';
import { Link } from '../components/Buttons';

const SettingsScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: "Settings" })
  }, [navigation]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Header text="My Account" style={{ marginBottom: 12 }}/>
        <Pressable>
          <Icon name="edit" size={20} color="black"/>
        </Pressable>
      </View>
      <CaptionedTextBox caption="Email"/>
      <CaptionedTextBox caption="Password"/>
      <CaptionedTextBox caption="Phone Number"/>
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
      <Link text="Log Out"/>
      {/* Add more details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { SettingsScreen }
