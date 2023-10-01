import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import { CaptionedTextBox, Description } from '../components/Text';
import { appStyles } from '../components/Styles';

const MyListingAddScreen = ({ route, navigation }) => {
  return (
    <KeyboardAvoidingView
      style={appStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CaptionedTextBox caption="Title/Name of Listing *" />
      <CaptionedTextBox caption="Address *" />
      <CaptionedTextBox caption="Description" />
      <CaptionedTextBox numberOfLines={4} style={{ height: 100, paddingTop: 10 }} editable
        multiline caption="Pickup Instructions" />
      <Description text="Your account phone number will be available to viewers of your listing."/>
      {/* Add more details here */}
    </KeyboardAvoidingView>
  );
};

export { MyListingAddScreen }
