import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { Snatched } from '../components/Text';
import { PrimaryButton } from '../components/Buttons';
import { appStyles } from '../components/Styles';

const WelcomeScreen = ({ route, navigation }) => {
  return (
    <View style={[{alignItems: 'center'}, appStyles.centeredContainer]}>
      <Snatched text="SNATCHED"/>

      <PrimaryButton
        text="Let's get started"
        icon="arrow-forward"
        onPress={() => navigation.replace('LoginScreen')}
      />
      {/* Add more details here */}
    </View>
  );
};

export { WelcomeScreen }
