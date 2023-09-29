import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { CaptionedTextBox } from '../components/Text';
import { appStyles } from '../components/Styles';

const MyListingAddScreen = ({ route, navigation }) => {
  return (
    <View style={appStyles.container}>
      <CaptionedTextBox caption="Title/Name of Listing *" />
      <CaptionedTextBox caption="Address *" />
      <CaptionedTextBox caption="Description" />
      {/* Add more details here */}
    </View>
  );
};

export { MyListingAddScreen }
