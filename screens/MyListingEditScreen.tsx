import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import { RadioGroup } from 'react-native-radio-buttons-group';

import { Caption, CaptionedTextBox, Description } from '../components/Text';
import { appStyles } from '../components/Styles';
import { PrimaryButton } from '../components/Buttons';
import TagDropdown from '../components/TagDropdown';
import { useAuth } from '../contexts/AuthContext';
const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const MyListingEditScreen = ({ route, navigation }) => {

  const [boolCheck, setBoolCheck]  = useState(true);
  const { item } = route.params;
  const { returnCoord } = route.params;

  const multiSelectRef = useRef(null);
  const tagArray = item.tags;

  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (multiSelectRef.current) {
      multiSelectRef.current.setSelectedItems(tagArray);
      console.log(item);
    }
  }, []);

  const resolveNewAddress = async (lat, lon) => {
    var URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lon + '&key=' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    var data;
    try {
      data = await fetch(URL);
    }
    catch (err) {
      console.error(err);
    }
    var jsonAddress = await data.json();
    if (jsonAddress.status === "ZERO_RESULTS")
      return
    console.log("address resolved ", jsonAddress.results[0].formatted_address);
    setAddress(jsonAddress.results[0].formatted_address);
  }

  useFocusEffect(() => {
    if (returnCoord) {
      if (boolCheck){
        setBoolCheck(false);
        resolveNewAddress(returnCoord.latitude, returnCoord.longitude);
      }
    }
    else {
    }
  });

  const cleanNumbers = (text) => {
    if (text == "")
      onChangeStockNum("-");
    else {
      text = text.replace(/[^0-9]/g, '')
      onChangeStockNum(text);
    }
  }

  const [selectedID, setSelectedID] = useState(item.should_contact ? "1" : "0");
  const radioButtons = useMemo(() => ([
    {
      id: '1',
      label: 'Yes',
      value: '1'
    },{
      id: '0',
      label: 'No',
      value: '0'
    }
  ]), []);

  const [title, onChangeTitle] = useState("");
  const [desc, onChangeDesc] = useState("");
  const [stockNum, onChangeStockNum] = useState("");
  const [pickUpInstructions, onChangePickupInstructions] = useState("");

  const { getJwt } = useAuth();
  const submitChanges = async () => {
    try {
      setIsLoading(true);
      console.log("entering on submit");
      var newData = {};
      if (address)
        {newData.address = address; item.address = address;}
      if (desc)
        {newData.description = desc; item.description = desc;}
      if (title)
        {newData.title = title; item.title = title;}
      if (selectedID == "1")
        {newData.should_contact = 1; item.should_contact = 1;}
      else
        {newData.should_contact = 0; item.should_contact = 0;}
      if (pickUpInstructions)
        {newData.pickup_instructions = pickUpInstructions; item.pickup_instructions = 0;}
      if (stockNum)
        {newData.stock_num = stockNum; item.stock_num = stockNum;}
      if (multiSelectRef.current) {
        var selectedTags = multiSelectRef.current.getSelectedItems();
        newData.tags = selectedTags; item.tags = selectedTags;
      }
      newData = JSON.stringify(newData);

      console.log("test submit", newData);
      const response = await fetch(
        API_ENDPOINT + "/listing/" + item.listing_ID, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        },
        body: newData
      })

      if (response.ok){
        Alert.alert(
          "Listing updated",
          "",
          [{text: "OK", onPress: () => {
            navigation.navigate('MyListingDetailScreen', {item: item});
          }}]
        );
      }
      else{
        throw await response.text();
      }
    }
    catch (error) {
      console.log(error);
      Alert.alert("There was a server side error updating the Listing.", "Try again, or submit a response on the bug report form and we'll do it manually.", [{text: "OK"}])
    }
    finally {
      setIsLoading(false);
      console.log(item);
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={appStyles.container}>
          <Description
            text="Fill out the listing details"
            style={{ flex: 0.2, textAlign: 'left' }} />

          <CaptionedTextBox
            caption="Title/Name of Listing *"
            defaultValue={item.title} onChangeText={onChangeTitle} />
          
          <CaptionedTextBox
            icon="edit-location"
            iconColor="red"
            multiline={true}
            numberOfLines={3}
            style={{height:70}}
            onIconPress={() => {
              setBoolCheck(true);
              navigation.navigate('LocationSelectScreen', { returnScreen: 'MyListingEditScreen', item: item })
            }}
            caption="Address *"
            readOnly={true}
            defaultValue={address? address : item.address} />
          
          <CaptionedTextBox
            multiline={true}
            numberOfLines={4}
            style={{height:100}}
            caption="Description"
            defaultValue={item.description}
            onChangeText={onChangeDesc} />
          
          <CaptionedTextBox
            caption="Stock Number"
            keyboardType="numeric"
            defaultValue={item.stock_num ? item.stock_num.toString() : "-"}
            onChangeText={cleanNumbers} />
          
          <Caption
            text={"Should you be contacted before a pickup?"} />
          <RadioGroup
            layout={'row'}
            radioButtons={radioButtons}
            onPress={setSelectedID}
            selectedId={selectedID} />
          
          <CaptionedTextBox
            multiline={true}
            numberOfLines={3}
            style={{height:70}}
            caption="Pickup instructions"
            defaultValue={item.pickup_instructions}
            onChangeText={onChangePickupInstructions} />
          
          <TagDropdown ref={multiSelectRef} />
          
          <PrimaryButton
            isLoading={isLoading}
            text={"Submit Changes"}
            onPress={() => submitChanges()} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export { MyListingEditScreen }
