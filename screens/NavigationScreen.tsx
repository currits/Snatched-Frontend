import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Linking,
  Platform,
  PlatformColor
} from 'react-native';

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
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { SmallSnatched } from '../components/Text';

import { useAuth } from '../contexts/AuthContext';
import { LogoutAlert } from '../components/LogoutAlert';

import { WelcomeScreen } from './WelcomeScreen'
import { LoginScreen } from './LoginScreen'
import { SignupScreen } from './SignupScreen'
import { HomeScreen } from './HomeScreen'
import { SearchScreen } from './SearchScreen'
import { MyListingsScreen } from './MyListingsScreen'
import { SettingsScreen } from './SettingsScreen'

// Sub screens
import { MyListingDetailScreen } from './MyListingDetailScreen'
import { MyListingEditScreen } from './MyListingEditScreen'
import { MyListingAddScreen } from './MyListingAddScreen'
import { ListingDetailScreen } from './ListingDetailScreen';
import { LocationSelectScreen } from './LocationSelectScreen';
import { AboutScreen } from './AboutScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SmallSnatched />
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
          <DrawerItemList {...props} footer={true}/>
      </DrawerContentScrollView>
      
      <View>
        {/*<DrawerItem
          icon={({ name, size }) => <Icon color="#1575FC" size={size} name="email" /> }
          label="Help/Contact"
          labelStyle={{ color: "#1575FC" }}
          onPress={() => { Linking.openURL("mailto:kurtisrae.mokaraka@gmail.com"); }}
        />*/}
        <DrawerItem
          icon={({ name, size }) => <Icon color="red" size={size} name="bug-report" /> }
          label="Bug Report/Feedback"
          labelStyle={{ color: "red" }}
          onPress={() => { Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfqBSbFNh4jS6z7nGxM6-7MOnuWTTITd3YkSJXoPD4o2TdnXA/viewform?usp=sf_link"); }}
        />
        <DrawerItem
          icon={({ name, color, size }) => <Icon color={color} size={size} name="settings" /> }
          label="Settings"
          onPress={() => { props.navigation.navigate('Settings'); }}
        />
        <DrawerItem
          icon={({ name, color, size }) => <Icon color={color} size={size} name="logout" /> }
          label="Log Out"
          onPress={() => LogoutAlert(logout)}
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
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
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

  const { isLoggedIn, isInitializing, login } = useAuth();

  if (isInitializing) return null;

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
          // This is where all other screens are added in besides any drawer items
          // Any drawer items that want to navigate to another screen should add the
          // screens in here
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
                title: "Location Selector",
              }} name="LocationSelectScreen" component={LocationSelectScreen}
            />
            <Stack.Screen options={{
                title: "Create New Listing",
              }} name="MyListingAddScreen" component={MyListingAddScreen}
            />
            <Stack.Screen options={{
                title: "Listing Details",
            }} name="ListingDetailScreen" component={ListingDetailScreen}
            />
            <Stack.Screen options={{
                title: "About",
            }} name="AboutScreen" component={AboutScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { NavigationScreen }
