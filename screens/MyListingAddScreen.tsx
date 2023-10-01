import React, {useRef, useState, useMemo} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import { CaptionedTextBox, Description, CaptionedTextBoxWithIcon, Caption } from '../components/Text';
import { appStyles } from '../components/Styles';
import { PrimaryButton } from '../components/Buttons';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { useAuth } from '../contexts/AuthContext';
import TagDropdown from '../components/TagDropdown';
import { useFocusEffect } from '@react-navigation/native';
const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const MyListingAddScreen = ({ route, navigation }) => {
  const multiSelectRef = useRef(null);
  const [address, setAddress] = useState(null);
  const { returnCoord } = route.params;
  const [boolCheck, setBoolCheck]  = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { getJwt } = useAuth();

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

  const handleRadionChange = (value) => {
    setSelectedID(value);
    if (value == "1")
      {setWillDisplayPhNum(true)}
    else
      {setWillDisplayPhNum(false)}
  }
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

  const [title, onChangeTitle] = useState("");
  const [desc, onChangeDesc] = useState("");
  const [stockNum, onChangeStockNum] = useState("");
  const [pickUpInstructions, onChangePickupInstructions] = useState("");
  const [willDisplayPhNum, setWillDisplayPhNum] = useState(false);

  const runCheck = () => {
    if(!title || !returnCoord || !desc || !pickUpInstructions){
      Alert.alert("Missing Input", "Make sure to fill all the required fields; title, address, description and pick up instructions", [{text: "OK"}])
      return;
    }
    else {
      Alert.alert("Submit Listing?","For " + title + " at " + address, [{text: "Confirm", onPress: () => submitListing()}, {text: "Cancel"}])
    }
  }

  const submitListing = async () => {
    try {
      setIsLoading(true);
      console.log("entering submitListing");
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
        var selectedTags = multiSelectRef.current.getSelectedItems();
        newData.tags = selectedTags;
      }
      newData = JSON.stringify(newData);
      console.log("test submit new", newData);
      const response = await fetch(
        API_ENDPOINT + "/listing/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        },
        body: newData
      })

      if (response.ok){
        Alert.alert("Listing Created", "Your new listing has successfuly been created.", [{text: "OK", onPress: ()=>{navigation.goBack()}}]);
      }
      else{
        throw await response.text();
      }
    }
    catch(error){
      console.log(error);
      Alert.alert("There was a server side error creating the Listing.", "You can try to submit again, but successive submissions will create duplicate listings. If you run into any more trouble, submit a response on the bug report form and we'll reach out to help.", [{text: "OK"}])
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <ScrollView>
      <Caption text={"Fields marked * are required"} style={{textAlign: 'center', marginTop: 10}}></Caption>
      <View style={appStyles.container}>
      <CaptionedTextBox caption="Title/Name of Listing *" placeholder={"Enter a fitting name for your listing"} onChangeText={onChangeTitle} />
      <CaptionedTextBoxWithIcon multiline={true} numberOfLines={3} style={{height:70}} onPress={() => {setBoolCheck(true); navigation.navigate('LocationSelectScreen', { returnScreen: 'MyListingAddScreen', item: null }) }} caption="Address *" readOnly={true} placeholder={"Press the red button to go to the map. Tap the map to drop a pin, and tap confirm when you're ready."} value={address? address : null} />
      <CaptionedTextBox multiline={true} numberOfLines={4} style={{height:100}} caption="Description *" placeholder={"Enter a description"} onChangeText={onChangeDesc} />
      <CaptionedTextBox caption="Stock Number" keyboardType="numeric" placeholder={"Enter an approx. number, or leave blank."} onChangeText={cleanNumbers} />
      <Caption text={"Should you be contacted before a pickup?"}></Caption>
        <RadioGroup layout={'row'}radioButtons={radioButtons} onPress={handleRadionChange} selectedId={selectedID}/>
      <Description style={{marginBottom: 10}} text={willDisplayPhNum? "Your account phone number and username will be available to viewers of your listing." : "Your account phone number and username will not be available to viewers of your listing."} />
      <CaptionedTextBox multiline={true} numberOfLines={4} style={{height:100}} caption="Pickup instructions *" placeholder={"Include things like; where on the property to find the produce, obstacles that may be encountered, best times to collect, any pets to keep in mind"} onChangeText={onChangePickupInstructions} />
      <Caption text={"Add tags to categorise the listing."}></Caption>
      <TagDropdown ref={multiSelectRef}></TagDropdown>
      <PrimaryButton style={{backgroundColor : 'green'}} isLoading={isLoading} text={"Submit new Listing"} onPress={() => runCheck()}></PrimaryButton>
      </View>
    </ScrollView>
  );
};

export { MyListingAddScreen }
  /*<KeyboardAvoidingView
      style={appStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
  </KeyboardAvoidingView> */