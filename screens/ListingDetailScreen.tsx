import React from 'react';
import {useState} from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { PrimaryButton } from '../components/Buttons';
import ProtocolModal from '../components/ProtocolModal';

const ListingDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: item.title })
  }, [navigation, item.description]);

  //    Exchange Protocol popup hooks    //
  const [isProtocolModalVisible, setProtocolModalVisible] = useState(false);
  const toggleProtocolModal = () => {
    setProtocolModalVisible(!isProtocolModalVisible);
  };

  const url = 'http://10.0.2.2:5000/';
  //const getListingData = async (id)

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {/* Add more details here */}
      <PrimaryButton onPress={setProtocolModalVisible} text="Snatch!" style={{ margin: 12, flex: 0.5 }}/>
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
  name: {
    flex: 1,
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
