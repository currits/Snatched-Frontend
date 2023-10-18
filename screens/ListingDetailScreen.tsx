import { React, useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import { PrimaryButton } from '../components/Buttons';
import { appStyles } from '../components/Styles';
import { Title, Header, Caption, Description } from '../components/Text';
import ProtocolModal from '../components/ProtocolModal';
import Tags from '../components/Tags';
import {getDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';

import { useAuth } from '../contexts/AuthContext';

const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

/**
 * A Screen for displaying the details of a Listing after selecting More Info on the home screen
 * @param param0 needs route and navigation object from react-navigation
 * @returns A screen
 */
const ListingDetailScreen = ({ route, navigation }) => {
  
  // Extract the listing from the route
  const { listing } = route.params;
  // Prepare auth for fetching from api
  const { getJwt } = useAuth();

  // Set the title for the screen
  useEffect(() => {
    navigation.setOptions({ title: listing.title })
  }, [navigation]);

  //    Exchange Protocol popup hooks    //
  // Setup the Exchange and Contact modal states
  const [isProtocolModalVisible, setProtocolModalVisible] = useState(false);
  const toggleProtocolModal = () => {
    setProtocolModalVisible(!isProtocolModalVisible);
  };

  // use state to display listing content data after fetch
  const [listingContent, setListingContent] = useState(null);

  //Method to fetch the listing data from the api
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

  // fetch full listing data from the api on load of the screen
  useEffect(() => {
    getListingData(listing.listing_ID);
  }, []);

  // fetch the geolocation of the user
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

  // here we set the two points to do a distance calc
	var targetCoords = {latitude: listing.lat, longitude: listing.lon}
	var userLocation = userCoords;
  // Believe these two lines can be removed, testing required
  const [contactOptions, setContactOptions] = useState(null);
  var contactObject = {should_contact: (listing.should_contact == 1)? true: false, user_ID: listing.userUserID, listing_ID: listing.listing_ID };

  useEffect(() => {setContactOptions(contactObject)}, []);

  return (
    <View style={styles.container}>
      <View style={styles.nameBox}>
        <Text style={styles.title}>{listing.title}</Text>
        {userCoords && <Text style={styles.distance}>{(getDistance(userLocation, targetCoords, 100)/1000)}km</Text>}
      </View>

      <Description style={styles.stock} text={"Approx. Stock: " + (listingContent ? listingContent.stock_num : "-")} />
      
      <Caption text="Tags" />
      <View style={styles.tagContainer}>
        {listingContent && <Tags tags={listingContent.tags}></Tags>}
      </View>

      <Caption text="Description" />
      <Text style={styles.description}>{listing.description}</Text>
        
      <Caption text="Pickup instructions" />
      <Text style={styles.pickup}>{listing.pickup_instructions}</Text>
      <PrimaryButton onPress={() =>{toggleProtocolModal()}} text="Snatch!" style={{ margin: 12 }}/>
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
    flex: 3,
    fontSize: 16,
    marginTop: 8,
  },
  stock: {
    flex: 0.5,
    fontSize: 16,
  },
  tagContainer: {
    marginTop: 6,
    flex: 1,
  },
  pickup :{
    flex: 3,
    fontSize: 16,
    marginTop: 8,
  }
});

export { ListingDetailScreen }
