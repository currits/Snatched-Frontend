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
import { useDummyList } from '../contexts/DummyContext';
import TagDropdown from '../components/TagDropdown';
const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

function SearchScreen({ navigation }) {
  const { getJwt } = useAuth();  
  const { dummyList } = useDummyList();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const isFocused = useIsFocused();
  const multiSelectRef = useRef(null);

  const [searchResults, setSearchResults] = useState(dummyList);
  
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
        response.json().then((json) => {
          setSearchResults(json);
        })
      }
    }
    catch (error) {
      console.error(error)
    }
  }

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
        renderItem={({ item }) => <Listing item={item} navigation={navigation} />} // Use the component here
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

const Listing = ({ item, navigation }) => {
  const handlePress = () => {
    navigation.push('ListingDetailScreen', { item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Caption text={item.title} style={{ flex: 1 }} />
          <Hint text={item.distance + "km"} style={{ marginTop: 0 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { SearchScreen }
