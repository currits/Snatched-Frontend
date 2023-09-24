import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { SearchBar } from './SearchBar';

import { useDummyList } from '../contexts/DummyContext';

function SearchScreen({ navigation }) {
  const { dummyList } = useDummyList();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const isFocused = useIsFocused();

  return (
    <View>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        onSubmit={() => {
          alert("boo");
        }}
        onCancel={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={dummyList}
        renderItem={({ item }) => <Listing item={item} navigation={navigation} />} // Use the component here
      />
    </View>
  );
}

const ListItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  }
});

const Listing = ({ item, navigation }) => {
  const handlePress = () => {
    navigation.push('ListingDetailScreen', { item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={ListItemStyles.container}>
        <View style={ListItemStyles.textContainer}>
          <Text style={ListItemStyles.name}>{item.name}</Text>
          <Text style={ListItemStyles.description}>{item.distance}km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { SearchScreen }
