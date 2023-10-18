import { React } from "react";
import {
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableOpacity
} from "react-native";

import { Caption, Hint, DynamicIcon } from '../components/Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    marginVertical: 8,
    elevation: 1,
    backgroundColor: 'white'
  },
  textContainer: {
    flex: 10,
  },
  description: {
    opacity: 0.7,
  }
});

/**
 * A touchable component that displays the name and description of a user's own listings in their MyListings screen.
 * @param param0 Listing JSON, onPress funcion, onPress function for edit icon
 * @returns 
 */
const MyListing = ({ item, onPress, onEditPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Caption text={item.title}/>
          <Hint style={styles.description} text={item.description}/>
        </View>
        <Pressable onPress={onEditPress}>
        	<DynamicIcon name="edit" size={20} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export { MyListing }
