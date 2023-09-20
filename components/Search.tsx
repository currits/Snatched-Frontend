import React, { useState } from 'react';

import {
  Text,
  TextInput,
  View
} from 'react-native';

function Search() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    // Handle search logic here
    console.log('Search Text:', text);
  };
  
  return (
    <View>
      <TextInput
        placeholder="Search..."
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={() => handleSearch(searchText)}
      />
    </View>
  );
}

export { Search }
