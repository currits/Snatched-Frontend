import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
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

import { HomeScreen } from './HomeScreen'
import { Search } from './Search'
import { MyListingsScreen } from './MyListingsScreen'

// Sub screens
import { MyListingDetailScreen } from './MyListingDetailScreen'
import { MyListingEditScreen } from './MyListingEditScreen'
import { MyListingAddScreen } from './MyListingAddScreen'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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
        component={HomeScreen}
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
        component={MyListingsScreen}
        options={{
          drawerLabel: 'My Listings',
          drawerIcon: icon=({ name, color, size }) => <Icon color={color} size={size} name="list" />
        }}
      />
    </Drawer.Navigator>
  );
}

function NavigationScreen() {
  var theme = useColorScheme();
  // for now cause it's slightly buggy aye
  theme = 'light';

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Snatched" component={MainDrawer} />
        <Stack.Screen name="MyListingDetailScreen" component={MyListingDetailScreen} />
        <Stack.Screen name="MyListingEditScreen" component={MyListingEditScreen} />
        <Stack.Screen name="MyListingAddScreen" component={MyListingAddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { NavigationScreen }
