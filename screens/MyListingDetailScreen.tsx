import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import { PrimaryButton } from '../components/Buttons';
import { appStyles } from '../components/Styles';
import { Title, Caption, Description } from '../components/Text';
import Tags from '../components/Tags';
const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;
import { useAuth } from '../contexts/AuthContext';

/**
 * Screen for user to view the details of their own individual listings.
 * Makes requests to the api.
 * Here is where deletion of user listings is actioned.
 * @param param0 Route, Navigation
 * @returns The MyListingDetail screen
 */
const MyListingDetailScreen = ({ route, navigation }) => {
  // Extract the listing from the route
  const { item } = route.params;
  // Setup auth for fetching to the api
  const { getJwt } = useAuth();
  // create state for showing system feedback to the user (loading swirl on delete button)
  const [isLoading, setIsLoading] = useState(false);

  // on load, dynamically set the title of the screen
  React.useEffect(() => {
    navigation.setOptions({ title: item.title })
  }, [navigation, item.title]);

  // Method for deleting a listing for the database.
  // Destructive, Idempotent.
  const deleteListing = async () => {
    return Alert.alert(
      "Are you sure you want to delete this listing?",
      "This action cannot be undone.",
      [
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              const response = await fetch(
                API_ENDPOINT + "/listing/" + item.listing_ID, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": 'Bearer ' + await getJwt()
                }}
              )
                
              if (response.ok) {
                Alert.alert("Listings has been deleted.", "", [{text: "OK", onPress: () =>{navigation.goBack()}}])
              } else {
                throw await response.text();
              }
            }
            catch(error){
              Alert.alert("There was a server side error deleting the Listing.", "Try again, or submit a response on the bug report form and we'll do it manually.", [{text: "OK"}])
            }
            finally{
              setIsLoading(false);
            }
          },
        }
      ]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Title text={item.title} style={{flex: 1}}/>
        <Description style={styles.stock} text={"Contact before pickup: " + ((item.should_contact == 0)? "No" : "Yes")} />
        <Description style={styles.stock} text={"Approx. Stock: " + (item.stock_num ? item.stock_num : "-")} />
        <Description style={styles.address} text={"Address: " + item.address} />
        
        <Caption text="Tags" />
        <View style={styles.tagContainer}>
          <Tags tags={item.tags}></Tags>
        </View>
        
        <Caption text="Description" />
        <Description text={item.description} style={styles.description}/>
        
        <Caption text="Pickup instructions" />
        <Description text={item.pickup_instructions} style={styles.description}/>
      </View>
      <View style={appStyles.bottomContainer}>
        <PrimaryButton
          text="Edit Listing"
          icon="edit"
          onPress={() => navigation.push('MyListingEditScreen', { item })}
        />
        <PrimaryButton
          text="Delete Listing"
          icon="delete-forever"
          style={{backgroundColor: 'red'}}
          onPress={() => deleteListing()}
          isLoading={isLoading}
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
    marginTop: 6,
    flex: 1,
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
  address: {
    flex: 1,
    fontSize: 16,
  },
});

export { MyListingDetailScreen }
