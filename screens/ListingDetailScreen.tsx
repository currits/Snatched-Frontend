import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';

const ListingDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: item.title })
  }, [navigation, item.description]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {/* Add more details here */}
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

export { ListingDetailScreen }
