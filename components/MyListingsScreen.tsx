import React from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { MyListingDetailScreen } from './MyListingDetailScreen';
import { useDummyList } from '../contexts/DummyContext';

const Stack = createNativeStackNavigator();

const MyListingsScreen = ({ navigation }) => {
  const { dummyList } = useDummyList();

  return (
    <View>
      <FlatList
        data={dummyList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MyListing item={item} navigation={navigation} />} // Use the component here
      />
      <Button
        title="Add new Listing"
        onPress={() => navigation.push('MyListingAddScreen')}
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
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  }
});

const MyListing = ({ item, navigation }) => {
  const handlePress = () => {
    navigation.push('MyListingDetailScreen', { item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={ListItemStyles.container}>
        <View style={ListItemStyles.textContainer}>
          <Text style={ListItemStyles.name}>{item.name}</Text>
          <Text style={ListItemStyles.description}>{item.description}</Text>
          <Button
            title="Edit Listing"
            onPress={() => navigation.push('MyListingEditScreen', { item })}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { MyListingsScreen }
