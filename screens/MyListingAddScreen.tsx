import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  Keyboard
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioGroup } from 'react-native-radio-buttons-group';

import { CaptionedTextBox, Description, Caption } from '../components/Text';
import { appStyles } from '../components/Styles';
import { PrimaryButton } from '../components/Buttons';
import { useAuth } from '../contexts/AuthContext';
import TagDropdown from '../components/TagDropdown';
import { useFocusEffect } from '@react-navigation/native';
const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

/**
 * Screen for users to create new listings to submit to the api
 * Makes requests to geolocation, api.
 * @param param0 Route, Navigation
 * @returns The MyListingAdd screen
 */
const MyListingAddScreen = ({ route, navigation }) => {

  // This ref will be used to access the methods inside the TagDropdown component, for manipulating the multiselect
  const multiSelectRef = useRef(null);
  // For storing the selected address
  const [address, setAddress] = useState(null);
  // For storing any coordinates that may have been passed in the route to this screen
  // Note that coords will only be in the route if we have 'returned' to this screen after navigating to the LocationSelectScreen and selecting coordinates.
  // Imagine ThisScreen -> locationSelect -> back to ThisScreen with coords now in the route.
  const { returnCoord } = route.params;
  // Used to check if we have coordinates to resolve
  const [boolCheck, setBoolCheck]  = useState(true);
  // Used to render system feedback to user (loading swirl on submit button)
  const [isLoading, setIsLoading] = useState(false);
  // Setup auth for fetching from api
  const { getJwt } = useAuth();

  // Method for taking a set of lat lng coords and getting the GoogleMaps equivalent address
  // Needed by the backend to create the listing in the DB
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

  // Method for tracking which radio button has been selected for ShouldContact field
  const handleRadionChange = (value) => {
    setSelectedID(value);
    if (value == "1")
      {setWillDisplayPhNum(true)}
    else
      {setWillDisplayPhNum(false)}
  }
  // More needed setup for radio buttons, and tracking their state
  const [selectedID, setSelectedID] = useState();
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
  const [willDisplayPhNum, setWillDisplayPhNum] = useState(false);

  // Method to validate user input and send data if valid. E
  // Each listing requires all of: title, address, description and pickup instructions
  // Throws a user alert if not all input is entered.
  // Otherwise, calls the async submit method
  const runCheck = () => {
    if(!title || !returnCoord || !desc || !pickUpInstructions){
      Alert.alert("Missing Input", "Make sure to fill all the required fields; title, address, description and pick up instructions", [{text: "OK"}])
      return;
    }
    else {
      Alert.alert("Submit Listing?", "For " + title + " at " + address, [{text: "Confirm", onPress: () => submitListing()}, {text: "Cancel"}])
    }
  }

  // Method to submit user input to the api to create a new listing
  const submitListing = async () => {
    try {
      // Show user that things are happening
      setIsLoading(true);
      console.log("entering submitListing");
      // Get the entered data into a JSON for POST
      // Validation has already been performed
      var newData = {};
      newData.title = title;
      newData.address = address;
      if (desc)
      {newData.description = desc}
      if (title)
        {newData.title = title}
      if (selectedID && selectedID == "1")
        {newData.should_contact = 1}
      else
        {newData.should_contact = 0}
      if (pickUpInstructions)
        {newData.pickup_instructions = pickUpInstructions}
      if (stockNum)
        {newData.stock_num = stockNum}
      if (multiSelectRef.current) {
        // Note the use of the multiSelect ref of the TagDropdown which uses the exposed methods
        var selectedTags = multiSelectRef.current.getSelectedItems();
        newData.tags = selectedTags;
      }
      // Stringify for https submission
      newData = JSON.stringify(newData);
      console.log("test submit new", newData);
      // Send it off
      const response = await fetch(
        API_ENDPOINT + "/listing/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        },
        body: newData
      })

      // Check the reponse, if successful alert user, navigate away
      if (response.ok){
        Alert.alert(
          "Listing Created",
          "Your new listing has successfuly been created.",
          [{text: "OK", onPress: () => {
            navigation.goBack()
          }}]
        );
      }
      else{
        throw await response.text();
      }
    }
    catch(error){
      console.log(error);
      Alert.alert(
        "There was a server side error creating the Listing.",
        "You can try to submit again, but successive submissions will create duplicate listings. If you run into any more trouble, submit a response on the bug report form and we'll reach out to help.",
        [{text: "OK"}]
      );
    }
    finally{
      // Stop showing system feedback
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardShouldPersistTaps="handled"
    >
      {/* Note the KeyboardAwareScrollView wrapper, for scrolling with the keyboard */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={appStyles.container}>
          <Caption 
            text={"Fields marked * are required"}
            style={{textAlign: 'center', marginTop: 10}} />
          
          <CaptionedTextBox
            caption="Title/Name of Listing *"
            placeholder={"Enter a fitting name for your listing"}
            onChangeText={onChangeTitle} />
          <CaptionedTextBox
            multiline={true}
            numberOfLines={3}
            style={{height:70}}
            icon="edit-location"
            iconColor="red"
            onIconPress={() => {
              setBoolCheck(true);
              navigation.navigate('LocationSelectScreen', { returnScreen: 'MyListingAddScreen', item: null })
            }}
            caption="Address *"
            readOnly={true}
            placeholder={"Press the red button to go to the map. Tap the map to drop a pin, and tap confirm when you're ready."}
            value={address? address : null} />
          
          <CaptionedTextBox
            multiline={true}
            numberOfLines={4}
            style={{height:100}}
            caption="Description *"
            placeholder={"Enter a description"}
            onChangeText={onChangeDesc} />
          
          <CaptionedTextBox
            caption="Stock Number"
            keyboardType="numeric"
            placeholder={"Enter an approx. number, or leave blank."}
            onChangeText={cleanNumbers} />
          
          <Caption text={"Should you be contacted before a pickup?"} />
          <RadioGroup
            layout={'row'}
            radioButtons={radioButtons}
            onPress={handleRadionChange}
            selectedId={selectedID} />
          <Description
            style={{marginBottom: 10}}
            text={willDisplayPhNum ?
              "Your account phone number and username will be available to viewers of your listing." :
              "Your account phone number and username will not be available to viewers of your listing."} />
          
          <CaptionedTextBox
            multiline={true}
            numberOfLines={4}
            style={{height:100}}
            caption="Pickup instructions *"
            placeholder={"Include things like; where on the property to find the produce, obstacles that may be encountered, best times to collect, any pets to keep in mind"}
            onChangeText={onChangePickupInstructions} />
          
          <Caption
            text={"Add tags to categorise the listing."} />
          <TagDropdown ref={multiSelectRef} />
          
          <PrimaryButton
            style={{backgroundColor : 'green'}}
            isLoading={isLoading}
            text={"Submit new Listing"}
            onPress={() => runCheck()} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export { MyListingAddScreen }