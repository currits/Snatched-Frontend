import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';

const MyListingDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: item.name })
  }, [navigation, item.name]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {/* Add more details here */}
      <Button
        title="Edit Listing"
        onPress={() => navigation.push('MyListingEditScreen', { item })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
});

export { MyListingDetailScreen }
