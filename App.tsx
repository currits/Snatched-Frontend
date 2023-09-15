/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationScreen } from './components/NavigationScreen'

function App(): JSX.Element {
  return (
    <AuthProvider>
      <NavigationScreen />
    </AuthProvider>
  );
}

export default App;
