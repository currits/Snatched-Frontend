import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { PrimaryButton } from '../components/Buttons';
import { appStyles } from '../components/Styles';
import { Title, Description } from '../components/Text';
import Tags from '../components/Tags';

const MyListingDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: item.title })
  }, [navigation, item.title]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Title text={item.title} style={{flex: 1}}/>
        <Text style={styles.stock}>Approx. Stock: {item.stock_num ? item.stock_num : "-"}</Text>
        <Text style={styles.stock}>Address: {item.address}</Text>
        <View style={styles.tagContainer}>
          <Tags tagString={item.tags}></Tags>
        </View>
        <Description text={item.description} style={styles.description}/>
      </View>
      <View style={appStyles.bottomContainer}>
        <PrimaryButton
          text="Edit Listing"
          icon="edit"
          onPress={() => navigation.push('MyListingEditScreen', { item })}
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
  tagContainer: {
    flex: 1,
  },
  description: {
    flex: 5,
    fontSize: 16,
    marginTop: 8,
  },
  stock: {
    flex: 0.5,
    fontSize: 16,
  },
});

export { MyListingDetailScreen }
