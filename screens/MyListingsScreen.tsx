import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MyListingDetailScreen } from './MyListingDetailScreen';
import { appStyles } from '../components/Styles';
import { PrimaryButton } from '../components/Buttons';
import { MyListing } from '../components/MyListing';
import { Title } from '../components/Text';
import { useAuth } from '../contexts/AuthContext';

const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const Stack = createNativeStackNavigator();

const MyListingsScreen = ({ navigation }) => {
  const { getJwt } = useAuth();

  const [listingContent, setListingContent] = useState(null);

  const getListingData = async () => {
    try {
      const response = await fetch(
        API_ENDPOINT + "/own", {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        }
      });
      if (!response.ok){
        throw new Error("Error retrieving listing from server.");
      }
      else {
        // if no markers
        if (response.status == 204) {
            setListingContent([]);
        }
        else if (response.status == 200) {
          response.json().then((json) => {
            setListingContent(json);
          });
        }
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getListingData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={appStyles.container}>
        <Title text="My Listings" />
        {/* Display a loading spinner while data is loading */}
        {!listingContent ? (
          <ActivityIndicator style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}/>
        ) : listingContent.length === 0 ? (
          // Display a message if listingContent is empty
          <Text style={{ textAlign: 'center' }}>You have made no listings.</Text>
        ) : (
          <FlatList
            style={{ margin: 0 }}
            data={listingContent}
            renderItem={({ item }) =>
              <MyListing item={item}
                onPress={() => navigation.push('MyListingDetailScreen', { item })}
                onEditPress={() => navigation.push('MyListingEditScreen', { item })} style={{flex: 1}}
              />
            }
          />
        )}
      </View>
      <View style={appStyles.bottomContainer}>
        <PrimaryButton text="Add new Listing" icon="add" onPress={() => navigation.push('MyListingAddScreen', {returnCoords: null})}/>
      </View>
    </View>
  );
}

export { MyListingsScreen }
