import React, { useState, useEffect, useRef } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../components/Styles'
import { Caption, Hint } from '../components/Text';
import { SearchBar } from '../components/SearchBar';
import TagDropdown from '../components/TagDropdown';
import {getDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';
const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

function SearchScreen({ navigation }) {
  const { getJwt } = useAuth();  
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const isFocused = useIsFocused();
  const multiSelectRef = useRef(null);

  const [searchResults, setSearchResults] = useState(null);
  
  const doSearch = async (phrase) => {
    // retrieve tags, assemble them into a ',' string
    var selectedTags = [];
    if (multiSelectRef.current){
      selectedTags = multiSelectRef.current.getSelectedItems();
      console.log("tags retrieved from select ", selectedTags);
    }
    var tagString = "";
    if (selectedTags.length != 0)
      selectedTags.forEach(x => tagString += ',' + x); tagString = tagString.slice(1);
    // now get search keywords
    var termString = "";
    if (phrase != "") {
      var terms = phrase.split(' ');
      terms.forEach(x => termString+= ',' + x);
      termString = termString.slice(1);
    }
    
    //form request url
    var URL = API_ENDPOINT + "/search?";
    if (tagString == "" && termString == "")
      return;
    if (tagString != "")
      URL += "tags=" + tagString + "&";
    if (termString != "")
      URL += "keywords=" + termString + "&";
    URL = URL.slice(0, URL.length);
    
    //then get it
    try {
      const response = await fetch(
        URL, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        }
      });
      if (!response.ok)
        throw new Error("Error retrieving listings from server.");
      else {
        // In case of empty search results returned
        if (response.status == 204) {
          setSearchResults(null);
        }
        else if (response.status == 200) {
          response.json().then((json) => {
            console.log("search results: ", json);
            setSearchResults(json);
          });
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const [userCoords, setUserCoords] = useState(null);
	useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition(
        position => {
          var coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          setUserCoords(coords);
          console.log(position);
          console.log(userCoords);
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
	}, []);

	var userLocation = userCoords;

  return (
    <View>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        onSubmit={() => {
          doSearch(searchPhrase);
        }}
        onCancel={() => {
          navigation.goBack();
        }}
      />
      <TagDropdown ref={multiSelectRef}></TagDropdown>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={searchResults}
        renderItem={({ item }) => <Listing item={item} navigation={navigation} userLoc={userLocation} />} // Use the component here
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.lightColor,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

const Listing = ({ item, navigation, userLoc }) => {
  const handlePress = () => {
    navigation.push('ListingDetailScreen', { listing: item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Caption text={item.title} style={{ flex: 1 }} />
          <Hint text={(getDistance(userLoc, {latitude: item.lat, longitude: item.lon}, 100)/1000) + "km"} style={{ marginTop: 0 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { SearchScreen }
