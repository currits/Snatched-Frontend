import React from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

const MyListingAddScreen = ({ route, navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({ title: "Create New Listing" })
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Title/Name of Listing *</Text>
      <TextInput style={styles.input} />
      <Text style={styles.caption}>Address *</Text>
      <TextInput style={styles.input} />
      <Text style={styles.caption}>Description</Text>
      <TextInput style={styles.input} />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export { MyListingAddScreen }
