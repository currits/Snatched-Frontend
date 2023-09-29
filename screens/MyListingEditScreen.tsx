import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import { CaptionedTextBox } from '../components/Text';
import { appStyles } from '../components/Styles';

const MyListingEditScreen = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={appStyles.container}>
      <Text>Fill out the listing details</Text>
      <CaptionedTextBox caption="Title/Name of Listing *" value={item.title} />
      <CaptionedTextBox caption="Address *" value={item.address} />
      <CaptionedTextBox caption="Description" value={item.description} />
      {/* Add more details here */}
    </View>
  );
};

export { MyListingEditScreen }
