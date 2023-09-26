import { React } from "react";
import {
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
    elevation: 1
  },
  textContainer: {
    flex: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  }
});

const MyListing = ({ item, onPress, onEditPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Pressable onPress={onEditPress}>
        	<Icon name="edit" size={20} color="black"/>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export { MyListing }
