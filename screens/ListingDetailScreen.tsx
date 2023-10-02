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

import { useAuth } from '../contexts/AuthContext';

const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const ListingDetailScreen = ({ route, navigation }) => {
  const { listing } = route.params;
  const { getJwt } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: listing.title })
  }, [navigation]);

  //    Exchange Protocol popup hooks    //
  const [isProtocolModalVisible, setProtocolModalVisible] = useState(false);
  const toggleProtocolModal = () => {
    setProtocolModalVisible(!isProtocolModalVisible);
  };

  const [listingContent, setListingContent] = useState(null);

  const getListingData = async (id) => {
    try {
      const response = await fetch(
        API_ENDPOINT + "/listing/" + id, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        }
      });
      if (!response.ok)
        throw new Error("Error retrieving listing from server.");
      else {
        response.json().then((json) => {
          setListingContent(json);
        })
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getListingData(listing.listing_ID);
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

	var targetCoords = {latitude: listing.lat, longitude: listing.lon}
	var userLocation = userCoords;
  const [contactOptions, setContactOptions] = useState(null);
  var contactObject = {should_contact: (listing.should_contact == 1)? true: false, user_ID: listing.userUserID, listing_ID: listing.listing_ID };

  useEffect(() => {setContactOptions(contactObject)}, []);

  return (
    <View style={styles.container}>
      <View style={styles.nameBox}>
        <Text style={styles.title}>{listing.title}</Text>
        {userCoords && <Text style={styles.distance}>{(getDistance(userLocation, targetCoords, 100)/1000)}km</Text>}
      </View>
      <Text style={styles.stock}>Approx. Stock: {listingContent ? listingContent.stock_num : "-"}</Text>
      <View style={styles.tagContainer}>
        {listingContent && <Tags tags={listingContent.tags}></Tags>}
      </View>
      <Text style={styles.description}>{listing.description}</Text>
      {/* Add more details here */}
      <PrimaryButton onPress={() =>{toggleProtocolModal()}} text="Snatch!" style={{ margin: 12, flex: 0.5 }}/>
      <ProtocolModal
        visible={isProtocolModalVisible}
        toggleModal={toggleProtocolModal}
        listing={listing}
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
