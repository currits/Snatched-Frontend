import React from 'react';

import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { Snatched, Title, Header, Description } from '../components/Text';
import { appStyles } from '../components/Styles';

const styles = StyleSheet.create({
  description: {
    marginBottom: 12
  }
});

const AboutScreen = ({ route, navigation }) => {
  return (
    <ScrollView contentContainerStyle={[{alignItems: 'center'}, appStyles.centeredContainer]}>
      <Snatched text="SNATCHED"/>
      <Title text="Made with <3 by..."/>

      <Header text="Kurt"/>
      <Description text="Frontend/iOS Lead" style={styles.description}/>

      <Header text="Kurtis"/>
      <Description text="Frontend/Android Lead" style={styles.description}/>

      <Header text="Ethyn"/>
      <Description text="Backend/Database Lead" style={styles.description}/>

      <Header text="Nikkaella"/>
      <Description text="Design Lead" style={styles.description}/>

      <Title text="In collaboration with..." style={{ marginTop: 24 }}/>
      <Header text="Impact Hub"/>
      <Description text="Waikato" style={styles.description}/>

      <Header text="The University of Waikato"/>
      <Description text="New Zealand" style={styles.description}/>
    </ScrollView>
  );
};

export { AboutScreen }
