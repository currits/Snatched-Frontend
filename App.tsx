/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { DummyListProvider } from './contexts/DummyContext';
import { NavigationScreen } from './screens/NavigationScreen'

function App(): JSX.Element {
  // Dummy list provider context is temporary
  return (
    <DummyListProvider>
      <AuthProvider>
        <NavigationScreen />
      </AuthProvider>
    </DummyListProvider>
  );
}

export default App;
