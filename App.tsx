import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import { DummyListProvider } from './contexts/DummyContext';
import { NavigationScreen } from './screens/NavigationScreen'

function App(): JSX.Element {
  useEffect(() => Appearance.setColorScheme('light'),
  [])

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
