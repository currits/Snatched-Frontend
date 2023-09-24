import React from 'react';

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useNavigation
} from '@react-navigation/native';
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
  Alert,
} from 'react-native';

import {
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';

import { useAuth } from '../contexts/AuthContext';

import { WelcomeScreen } from './WelcomeScreen'
import { LoginScreen } from './LoginScreen'
import { SignupScreen } from './SignupScreen'
import { HomeScreen } from './HomeScreen'
import { Search } from './Search'
import { MyListingsScreen } from './MyListingsScreen'
import { SettingsScreen } from './SettingsScreen'

// Sub screens
import { MyListingDetailScreen } from './MyListingDetailScreen'
import { MyListingEditScreen } from './MyListingEditScreen'
import { MyListingAddScreen } from './MyListingAddScreen'
import { ListingDetailScreen } from './ListingDetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  const { isLoggedIn, login, logout } = useAuth();

  const showLogoutConfirmDialog = () => {
    return Alert.alert(
      "Are you sure?",
      "Are you sure you want to log out?",
      [
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Cancel",
        },
        {
          text: "Log out",
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
          <DrawerItemList {...props} footer={true}/>
      </DrawerContentScrollView>
      
      <View>
        <DrawerItem
            icon={({ name, color, size }) => <Icon color={color} size={size} name="settings" /> }
            label="Settings"
            onPress={() => { props.navigation.navigate('Settings'); }}
          />
        <DrawerItem
            icon={({ name, color, size }) => <Icon color={color} size={size} name="logout" /> }
            label="Log Out"
            onPress={() => showLogoutConfirmDialog()}
          />
      </View>
    </SafeAreaView>
  );
}

function MainDrawer() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: icon=({ name, color, size }) => <Icon color={color} size={size} name="home" />,
          headerRight: ({props}) => (
            <HeaderButtons>
              <Item
                IconComponent={Icon} iconSize={23}
                title="search"
                iconName="search"
                onPress={() => { navigation.navigate('Search') }}
              />
            </HeaderButtons>
          ),
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
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerItemStyle: {
            display: 'none'
          }
        }}
      />
    </Drawer.Navigator>
  );
}

function NavigationScreen() {
  var theme = useColorScheme();
  // for now cause it's slightly buggy aye
  // textbox outlines, snatched header and other heading text
  theme = 'light';

  const { isLoggedIn, login, logout } = useAuth();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen options={{
                title: "Welcome",
                headerShown: false, gestureEnabled: false
              }} name="WelcomeScreen" component={WelcomeScreen}
            />
            <Stack.Screen options={{
                title: "Login",
                headerShown: false, gestureEnabled: false
              }} name="LoginScreen" component={LoginScreen}
            />
            <Stack.Screen options={{
                title: "Sign up",
              }} name="SignupScreen" component={SignupScreen}
            />
          </> 
        ) : (
          <>
            <Stack.Screen options={{
                title: "Snatched",
                headerShown: false, gestureEnabled: false
              }} name="Snatched" component={MainDrawer}
            />
            <Stack.Screen options={{
                title: "My Listing Details",
              }} name="MyListingDetailScreen" component={MyListingDetailScreen}
            />
            <Stack.Screen options={{
                title: "Edit Listing",
              }} name="MyListingEditScreen" component={MyListingEditScreen}
            />
            <Stack.Screen options={{
                title: "Create New Listing",
              }} name="MyListingAddScreen" component={MyListingAddScreen}
            />
            <Stack.Screen options={{
                title: "Listing Details",
            }} name="ListingDetailScreen" component={ListingDetailScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { NavigationScreen }
