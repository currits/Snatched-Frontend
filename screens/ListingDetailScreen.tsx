import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import { PrimaryButton } from '../components/Buttons';
import { appStyles } from '../components/Styles';
import { Title, Header } from '../components/Text';

const ListingDetailScreen = ({ route, navigation }) => {
  const { listing } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: listing.title })
  }, [navigation, listing.title]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title text={listing.title} style={{ marginBottom: 0 }} />
          <Header text="0.2km" />
        </View>
        <Text style={styles.description}>{listing.description}</Text>
        {/* Add more details here */}
      </View>
      <View style={appStyles.bottomContainer}>
        <PrimaryButton
          text="Snatch!"
          onPress={() => { alert("Snatch!") }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
});

export { ListingDetailScreen }
