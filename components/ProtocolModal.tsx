import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  Modal,
  Linking
} from "react-native";
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { exchangeText } from "../exchangeProtocol";
import { PrimaryButton } from '../components/Buttons';
import { Title, Caption, Description } from '../components/Text';
const API_ENDPOINT = require("../contexts/Constants").API_ENDPOINT;

const ProtocolModal = ({ visible, toggleModal, listing }) => {

  const { getJwt } = useAuth();  
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const toggleContactModal = () => {
    setContactModalVisible(!isContactModalVisible);
  };

  const makeBullet = (bulletList) => {
    var output = bulletList.map((element, index) => {
      return(
        <View style={styles.bulletWrapper} key={index}>
          <Text style={styles.bulletBullet} key={0}> • </Text>
          <Text style={styles.bulletText} key={1}>
          <Text style={{fontWeight: 'bold'}}>{element.bold} </Text>
          {element.rest}</Text>
        </View>
      );
    });
    return (<View style={styles.exchange}>{output}</View>);
  };

  const [address, setAddress] = useState(null);
  const [contact, setContact] = useState(null);
  const clearContactContent = () => {
    setAddress(null);
    setContact(null);
  };

  const getContactContent = async (listing) => {
    console.log(listing);
    console.log("contact modal making request");
    try {
      if (listing.should_contact) {
        console.log("contact modal fetching contact details")
        const userResponse = await fetch(
          API_ENDPOINT + "/user/" + listing.user_ID, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + await getJwt()
          }
        });
        if (userResponse.ok) {
          userResponse.json().then((json) => {
            console.log(json);
            setContact({username: json.username, phone: json.phone});
          })
        }
      }
      console.log("contact modal fetvhing listing address");
      console.log(listing.listing_ID);
      const listingReponse = await fetch(
        API_ENDPOINT + "/listing/" + listing.listing_ID, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + await getJwt()
        }
      });
      if (listingReponse.ok) {
        listingReponse.json().then((json) => {
          console.log(json);
          setAddress(json.address);
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const contactModalText = (address, contact) => {
    console.log("contactmodal making text");
    console.log(address);
    console.log(contact);
    return (
      <View style={{flex:2}}>
        <View key={0} style={{flex:0.2}}>
          <Text style={styles.modalText}>Address: {address}</Text>
        </View>
        {contact ? (
          <View key={1} style={{flex:1}}>
            <Text key={0} style={styles.modalText}>Username: {contact.username}</Text>
            <Text key={1} style={styles.modalText}>Phone: {contact.phone}</Text>
          </View>) : (
          <View style={{flex:1}}>
            <Text style={styles.modalText}>The Producer has specified they do not need to be contacted before pickup.</Text>
          </View>
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    title: {
      flex: 1,
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left'
    },
    exchange:{
      flex: 10,
      flexDirection: 'column'
    },
    bulletText:{
      flex: 3,
      fontSize: 14
    },
    bulletBullet:{
      flex: 0.5,
      fontSize: 14
    },
    bulletWrapper: {
      width: '100%',
      flexDirection: 'row',
      marginBottom: 16
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    buttonContact: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: 250,
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 32,
      elevation: 3,
      backgroundColor: 'dimgray',
      marginHorizontal: 8,
    },
    protocolView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    protocolModal: {
      flex: 1,
      flexDirection: 'column',
      width: '80%',
      marginTop: '20%',
      marginBottom: '35%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      justifyContent: 'flex-start',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    contactView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '45%',
      marginBottom: '40%'
    },
    contactModal: {
      flex: 1,
      flexDirection: 'column',
      width: '80%',
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'flex-start',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      fontSize: 14,
      textAlign: 'center',
      color: 'black'
    },
    buttonClose: {
      alignSelf: 'flex-end'
    },
  });

  return (
    <View>
      {/* Protocol Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggleModal}
      >
        <View style={styles.protocolView}>
          <View style={styles.protocolModal}>
            <Pressable
              style={styles.buttonClose}
              onPress={toggleModal}>
              <Icon name="close" size={24} color="black" />
            </Pressable>
            <Text style={styles.title}>Exchange Protocol</Text>
            {makeBullet(exchangeText)}
            <PrimaryButton
              onPress={() => { toggleModal(); setContactModalVisible(); getContactContent(listing);}}
              text="Contact Producer"
            />
          </View>
        </View>
      </Modal>

      {/* Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isContactModalVisible}
        onRequestClose={() => { toggleContactModal(); clearContactContent(); }}>
        <View style={styles.contactView}>
          <View style={styles.contactModal}>
            <Pressable
              style={styles.buttonClose}
              onPress={() => { toggleContactModal(); clearContactContent(); }}>
                <Icon name="close" size={24} color="black" />
            </Pressable>
            <Title style={{fontWeight: 'bold', flex: 1}} text={"Contact Information"}></Title>
            <View style={{flex: 4}}>{address && contactModalText(address, contact)}</View>
            <PrimaryButton text="Navigate" onPress={() => {
              const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
              const latLng = `${listing.lat},${listing.lon}`;
              const label = `${listing.title} via Snatched`;
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`
              });

              Linking.openURL(url);
            }}/>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ProtocolModal;
