import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Tags = ({ tags }) => {
    console.log(tags);
    var tagsAsText = tags.map((text, index) => {
      var view = <View style={styles.tagBox} key={index}>
        <Text style={styles.tag}>{text}</Text>
        </View>;
      return(view);
    });
    return (<View style={{flex:1, flexDirection: 'row'}}>{tagsAsText}</View>)
  };
  const styles = StyleSheet.create({
    tag: {
        fontSize: 14,
        color: 'grey'
      },
      tagBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 4,
        borderWidth: 1, 
        borderColor: 'lightgray',
        padding: 6,
        marginRight: 6,
      }
  });
  export default Tags;