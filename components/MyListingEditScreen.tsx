import React from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

const MyListingEditScreen = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text>Fill out the listing details</Text>
      <Text style={styles.caption}>Title/Name of Listing *</Text>
      <TextInput style={styles.input} value={item.name} />
      <Text style={styles.caption}>Address *</Text>
      <TextInput style={styles.input} value={item.address} />
      <Text style={styles.caption}>Description</Text>
      <TextInput style={styles.input} value={item.description} />
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

export { MyListingEditScreen }
