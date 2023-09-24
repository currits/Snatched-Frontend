import { React, useRef, useEffect } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

/* https://blog.logrocket.com/create-react-native-search-bar-from-scratch/ */

const SearchBar = ({clicked, onSubmit, onCancel, searchPhrase, setSearchPhrase, setClicked}) => {
  const textRef = useRef()

  // Focus the search bar when first rendering
  useEffect(()=>{
    textRef.current.focus();
  })

  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Icon
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          ref={textRef}
          style={styles.input}
          placeholder="Search"
          inputmode="search"
          returnKeyType="search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onSubmitEditing={() => {
            onSubmit();
          }}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Icon name="close" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              onCancel();
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export { SearchBar }

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    paddingLeft: 10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    width: "83%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 40,
    fontSize: 20,
    marginLeft: 10,
    width: "92%",
  },
});
