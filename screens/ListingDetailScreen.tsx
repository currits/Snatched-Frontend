import { React, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import { PrimaryButton } from '../components/Buttons';
import { appStyles } from '../components/Styles';
import { Title, Header } from '../components/Text';
import ProtocolModal from '../components/ProtocolModal';

const ListingDetailScreen = ({ route, navigation }) => {
  const { listing } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: item.title })
  }, [navigation, item.description]);

  //    Exchange Protocol popup hooks    //
  const [isProtocolModalVisible, setProtocolModalVisible] = useState(false);
  const toggleProtocolModal = () => {
    setProtocolModalVisible(!isProtocolModalVisible);
  };

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
          onPress={setProtocolModalVisible}
        />
      </View>
      <ProtocolModal
        visible={isProtocolModalVisible}
        toggleModal={toggleProtocolModal}
      />
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
    flex: 5,
    fontSize: 16,
    marginTop: 8,
  },
});

export { ListingDetailScreen }
