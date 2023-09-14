/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from 'react-native';

import { Navigation } from './components/NavigationDrawer'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Navigation />
  );
}

export default App;
