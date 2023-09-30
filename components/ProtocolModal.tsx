import { React, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  Modal
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import { exchangeText } from "../exchangeProtocol";

const ProtocolModal = ({ visible, toggleModal }) => {
  
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
      </View>);
    });
    return (<View style={styles.exchange}>{output}</View>);
  };

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
      flex: 1,
      width: '100%',
      flexDirection: 'row',
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
      margin: 20,
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
      marginTop: '40%',
      marginBottom: '35%'
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
      flex: 15,
      marginBottom: 15,
      textAlign: 'center',
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
            <Pressable
              style={styles.buttonContact}
              onPress={() => { toggleModal(); setContactModalVisible(); }}>
              <Text style={styles.buttonText}>Contact Producer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isContactModalVisible}
        onRequestClose={toggleContactModal}>
        <View style={styles.contactView}>
          <View style={styles.contactModal}>
            <Pressable
              style={styles.buttonClose}
              onPress={toggleContactModal}>
                <Icon name="close" size={24} color="black" />
            </Pressable>
            <Text style={styles.modalText}>Contact details here</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ProtocolModal;
