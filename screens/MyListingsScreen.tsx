import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MyListingDetailScreen } from './MyListingDetailScreen';
import { useDummyList } from '../contexts/DummyContext';
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
        response.json().then((json) => {
          setListingContent(json);
        })
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log("MyListings listing data call");
    getListingData();
  }, [])

  return (
    <View style={{flex: 1 }}>
      <View style={appStyles.container}>
        <Title text="My Listings" />
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
      </View>
      <View style={appStyles.bottomContainer}>
        <PrimaryButton text="Add new Listing" icon="add" onPress={() => navigation.push('MyListingAddScreen')}/>
      </View>
    </View>
  );
}

export { MyListingsScreen }
