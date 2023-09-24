import React from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Pressable
} from 'react-native';

import { MyListingDetailScreen } from './MyListingDetailScreen';
import { useDummyList } from '../contexts/DummyContext';

const Stack = createNativeStackNavigator();
const editIcon = <Icon name="edit" size={20} color="black"/>;

const MyListingsScreen = ({ navigation }) => {
  const { dummyList } = useDummyList();

  return (
    <View style={{flex: 1}}>
      <View style={ListItemStyles.listWrapper}>
        <FlatList
          data={dummyList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyListing item={item} navigation={navigation} />} // Use the component here
        />
      </View>
      <View
        style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}
      />
      <View style={ListItemStyles.buttonWrapper}>
        <Pressable onPress={() => navigation.push('MyListingAddScreen')} style={ListItemStyles.button2}>
            <Text style={ListItemStyles.buttonText}>Add new Listing</Text>
          </Pressable>
        </View>
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
    flex: 10,
  },
  listWrapper: {
    flex: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  buttonWrapper: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    height: 50,
    width: 250,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'dimgray',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    alignSelf: 'center',
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
        </View>
        <Pressable onPress={() => navigation.push('MyListingEditScreen', { item })} style={{flex: 1}}>{editIcon}</Pressable>
      </View>
    </TouchableOpacity>
  );
};

export { MyListingsScreen }
