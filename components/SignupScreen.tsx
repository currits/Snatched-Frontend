import React from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

const SignupScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Create your Account</Text>

      <Text style={styles.caption}>Email</Text>
      <TextInput style={styles.input} />

      <Text style={styles.caption}>Password</Text>
      <TextInput style={styles.input} />

      <Button
        title="Sign up"
        onPress={() => navigation.push('Snatched')}
      />
      {/* Add more details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250
  },
});

export { SignupScreen }
