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

const ProtocolModal = ({ visible, toggleModal }) => {
  const [isContactModalVisible, setContactModalVisible] = useState(false);

  const toggleContactModal = () => {
    setContactModalVisible(!isContactModalVisible);
  };

  const styles = StyleSheet.create({
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
      flex: 1,
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
              <Icon name="close" size={20} color="black" />
            </Pressable>
            <Text style={styles.modalText}>Exchange protocol here</Text>
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
                <Icon name="close" size={20} color="black" />
            </Pressable>
            <Text style={styles.modalText}>Contact details here</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ProtocolModal;
