import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import TagDropdown from '../components/TagDropdown';
import { CaptionedTextBox, Description } from '../components/Text';
import { appStyles } from '../components/Styles';
import { PrimaryButton } from '../components/Buttons';

const MyListingEditScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const multiSelectRef = useRef(null);
  const tagArray = item.tags.split(',');
  
  const [address, setAddress] = useState(null);
  
  const selectAddress = (newAddress) =>{
    setAddress(newAddress);
  }

  const navLocScreen = () => {}

  useEffect(() => {
    if (multiSelectRef.current){
      console.log("edit screen useEffect ", tagArray)
      multiSelectRef.current.setSelectedItems(tagArray);
    }
  }, []);

  return (
    <View style={appStyles.container}>
      <Description text="Fill out the listing details" style={{flex:0.2, textAlign: 'left'}} />
      <CaptionedTextBox caption="Title/Name of Listing *" value={item.title} />
      <CaptionedTextBox caption="Address *" value={item.address} />
      <CaptionedTextBox caption="Description" value={item.description} />
      <TagDropdown ref={multiSelectRef}></TagDropdown>
      <PrimaryButton text={"fire thing"} onPress={() => navigation.navigate('LocationSelectScreen')}></PrimaryButton>
    </View>
  );
};

export { MyListingEditScreen }
