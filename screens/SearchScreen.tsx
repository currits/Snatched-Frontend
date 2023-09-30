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

import { theme } from '../components/Styles'
import { Caption, Hint } from '../components/Text';
import { SearchBar } from '../components/SearchBar';
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
          alert("Searched for: " + searchPhrase);
        }}
        onCancel={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        keyboardShouldPersistTaps="always"
        data={dummyList}
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
    navigation.push('ListingDetailScreen', { listing: item });
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
