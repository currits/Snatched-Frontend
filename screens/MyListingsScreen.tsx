import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MyListingDetailScreen } from './MyListingDetailScreen';
import { useDummyList } from '../contexts/DummyContext';
import { PrimaryButton, buttonHelperStyles } from '../components/Buttons';
import { MyListing } from '../components/MyListing';
import { Title } from '../components/Text';

const Stack = createNativeStackNavigator();

const MyListingsScreen = ({ navigation }) => {
  const { dummyList } = useDummyList();

  return (
    <View style={{flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Title text="My Listings" />
        <FlatList
          style={{ margin: 0 }}
          data={dummyList}
          renderItem={({ item }) =>
            <MyListing item={item}
              onPress={() => navigation.push('MyListingDetailScreen', { item })}
              onEditPress={() => navigation.push('MyListingEditScreen', { item })} style={{flex: 1}}
            />
          }
        />
      </View>
      <View style={buttonHelperStyles.bottomButtonContainer}>
        <PrimaryButton text="Add new Listing" icon="add" onPress={() => navigation.push('MyListingAddScreen')}/>
      </View>
    </View>
  );
}

export { MyListingsScreen }
