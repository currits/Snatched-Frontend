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

/**
 * Screen for user to edit new listings to submit to the api
 * Makes requests to geolocation, api.
 * This screen is similar to MyListingAddScreen.
 * @param param0 Route, Navigation
 * @returns The ListingEdit screen
 */
const MyListingEditScreen = ({ route, navigation }) => {
  
  // This is used to check whether we need to resolve an address from coords passed in from the route
  const [boolCheck, setBoolCheck]  = useState(true);
  // Extract the listing data passed in the route
  const { item } = route.params;
  // Extract any coords passed in the route
  const { returnCoord } = route.params;
  // This ref will be used to access the methods inside the TagDropdown component, for manipulating the multiselect
  const multiSelectRef = useRef(null);
  // get the array of tags from the passed item
  const tagArray = item.tags;

  // State to manage address
  const [address, setAddress] = useState(null);

  // On load, take whatever tags are present in the item and make the TagDropdown display them
  useEffect(() => {
    if (multiSelectRef.current) {
      multiSelectRef.current.setSelectedItems(tagArray);
      console.log(item);
    }
  }, []);

  // Method for taking a set of lat lng coords and getting the GoogleMaps equivalent address
  // Needed by the backend to update the listing in the DB
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

  // Everytime we load this screen, check if we need to resolve a coordinate
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

  // Method for applying regex to the StockNum text input
  // Simple, currently just only passes text
  // To indicate a situation where stock number may be not applicable, will instead send "-" to backend, where backend will then hanle properly (backend will treat null as empty, so need to send something)
  const cleanNumbers = (text) => {
    if (text == "")
      onChangeStockNum("-");
    else {
      text = text.replace(/[^0-9]/g, '')
      onChangeStockNum(text);
    }
  }

  // More needed setup for radio buttons, and tracking their state
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

  // Series of states for tracking user input as it is entered
  const [title, onChangeTitle] = useState("");
  const [desc, onChangeDesc] = useState("");
  const [stockNum, onChangeStockNum] = useState("");
  const [pickUpInstructions, onChangePickupInstructions] = useState("");
  // Setup auth for fetching from api
  const { getJwt } = useAuth();
  // Method to submit user input to the api to update the selected listing
  const submitChanges = async () => {
    try {
      // Show user that things are happening
      setIsLoading(true);
      console.log("entering on submit");
      // Get the entered data into a JSON for POST
      // Validation has already been performed
      // Because we need want to show the updated details of the listing on the previous screen
      // And we dont want to be making redundant api requests, as we build the JSON to send to api, we also
      // Alter the item passed in from the route, which we will send back to the previous screen as part of the route. Hot potato.
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
        // Note the use of the multiSelect ref of the TagDropdown which uses the exposed methods
        var selectedTags = multiSelectRef.current.getSelectedItems();
        newData.tags = selectedTags; item.tags = selectedTags;
      }
      // Stringify for https submission
      newData = JSON.stringify(newData);
      console.log("test submit", newData);
      // Send it off
      const response = await fetch(
        API_ENDPOINT + "/listing/" + item.listing_ID, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        },
        body: newData
      })

      // Check the reponse, if successful alert user, navigate away
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
      {/* Note the KeyboardAwareScrollView wrapper, for scrolling with the keyboard */}
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
              {/* Note that we Hot potato the item to the location select screen */}
              {/* This will likely create a bug from users entering changes, then selecting a new address, then navigating back and finding their changes discarded. Need to resolve */}
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
