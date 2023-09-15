import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

const WelcomeScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>SNATCHED</Text>
      <Button
        title="Let's get started"
        onPress={() => navigation.replace('LoginScreen')}
      />
      {/* Add more details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { WelcomeScreen }
