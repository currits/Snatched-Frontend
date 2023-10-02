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
import { Title, Description } from '../components/Text';
import Tags from '../components/Tags';
const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;
import { useAuth } from '../contexts/AuthContext';

const MyListingDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { getJwt } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({ title: item.title })
  }, [navigation, item.title]);

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
        <Text style={styles.stock}>Contact before pickup: {(item.should_contact == 0)? "No" : "Yes"}</Text>
        <Text style={styles.stock}>Approx. Stock: {item.stock_num ? item.stock_num : "-"}</Text>
        <Text style={styles.address}>Address: {item.address}</Text>
        <View style={styles.tagContainer}>
          <Tags tags={item.tags}></Tags>
        </View>
        <Description text={item.description} style={styles.description}/>
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
