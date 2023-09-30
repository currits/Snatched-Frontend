import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Tags = ({ tagString }) => {
    console.log(tagString);
    var tags = tagString.split(',');
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
        width: 80,
        borderRadius: 4,
        borderWidth: 1, 
        borderColor: 'lightgray',
        padding: 6,
        marginRight: 6,
      }
  });
  export default Tags;