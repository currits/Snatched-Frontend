import { React, useState, useEffect } from 'react';

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
import Tags from '../components/Tags';
import {getDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';

const ListingDetailScreen = ({ route, navigation }) => {
  const { listing } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: listing.title })
  }, [navigation]);

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
  const [listingContent, setListingContent] = useState(null);

  const url = 'http://10.0.2.2:5000/';
  const getListingData = async (id) => {
    fetch(url + "listing/" + id)
    .then(response => {
      if(!response.ok)
        throw new Error("Error retrieving listing from server.");
      return response.json();
    })
    .then(json => {
      console.log(json);
      setListingContent(json);
      })
    .catch(error => {console.error(error)});
  }

  useEffect(() => {
    getListingData(item.listing_ID);
  }, []);

  const [userCoords, setUserCoords] = useState(null);
	useEffect(() => {
		Geolocation.getCurrentPosition(
			position => {
				var coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
				setUserCoords(coords);
				console.log(position);
				console.log(userCoords);
			},
			error => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	}, []);

	var targetCoords = {latitude: parseFloat(item.lat), longitude: parseFloat(item.lon)}
	var userLocation = userCoords;

  return (
    <View style={styles.container}>
      <View style={styles.nameBox}>
        <Text style={styles.title}>{item.title}</Text>
        {userCoords && <Text style={styles.distance}>{(getDistance(userLocation, targetCoords, 100)/1000)}km</Text>}
      </View>
      <Text style={styles.stock}>Approx. Stock: {listingContent ? listingContent.stock_num : "-"}</Text>
      <View style={styles.tagContainer}>
        {listingContent && <Tags tagString={listingContent.tags}></Tags>}
      </View>
      <Text style={styles.description}>{item.description}</Text>
      {/* Add more details here */}
      <PrimaryButton onPress={toggleProtocolModal} text="Snatch!" style={{ margin: 12, flex: 0.5 }}/>
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
    flex: 2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  nameBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  distance: {
    flex: 1,
    fontSize: 24,
    textAlign: 'right',
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
  tagContainer: {
    flex: 1,
  },
});

export { ListingDetailScreen }
