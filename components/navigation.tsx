import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Home, Search, MyListings} from './screens'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{flex: 1}} edges={[]} forceInset={{top: "always", horizontal: "never"}}>
      <View
        style={{
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 30 }}>
          SNATCHED
        </Text>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
          <DrawerItemList {...props} />
      </DrawerContentScrollView>
      
      <View>
          <DrawerItem
        icon={({ name, color, size }) => <Icon color={color} size={size} name="settings" /> }
        label="Settings"
        onPress={() => alert('Settings thing')}
      />
      <DrawerItem
        icon={({ name, color, size }) => <Icon color={color} size={size} name="logout" /> }
        label="Log Out"
        onPress={() => alert('Log out thing')}
      />
      </View>
    </SafeAreaView>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Home',
          drawerIcon: icon=({ name, color, size }) => <Icon color={color} size={size} name="home" />
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          drawerLabel: 'Search',
          drawerIcon: icon=({ name, color, size }) => <Icon color={color} size={size} name="search" />
        }}
      />
      <Drawer.Screen
        name="My Listings"
        component={MyListings}
        options={{
          drawerLabel: 'My Listings',
          drawerIcon: icon=({ name, color, size }) => <Icon color={color} size={size} name="list" />
        }}
      />
    </Drawer.Navigator>
  );
}

export { MainDrawer }
