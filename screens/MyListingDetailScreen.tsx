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

const MyListingDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: item.title })
  }, [navigation, item.title]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Title text={item.title}/>
        <Description text={item.description}/>
        {/* Add more details here */}
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
  }
});

export { MyListingDetailScreen }
