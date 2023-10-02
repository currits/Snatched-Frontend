import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationScreen } from './screens/NavigationScreen'

function App(): JSX.Element {
  useEffect(() => Appearance.setColorScheme('light'),
  [])

  return (
    <AuthProvider>
      <NavigationScreen />
    </AuthProvider>
  );
}

export default App;
