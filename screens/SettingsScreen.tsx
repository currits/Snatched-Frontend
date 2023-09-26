import React from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

const SettingsScreen = ({ route, navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({ title: "Settings" })
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>My account</Text>
      <Text>Placeholder</Text>
      <Text style={styles.caption}>App Settings</Text>
      <Text>Placeholder</Text>
      {/* Add more details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { SettingsScreen }
