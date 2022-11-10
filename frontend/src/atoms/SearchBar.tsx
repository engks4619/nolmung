import React, {useState} from 'react';
import {StyleSheet, Pressable, TextInput, View} from 'react-native';
import Search from '@assets/search.svg';

interface Props {
  searchValue: string;
  onSearchSubmit: (val: string) => void;
  onChangeSearchValue: (val: string) => void;
}

function SearchBar({onSearchSubmit, searchValue, onChangeSearchValue}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const customOnFocus = () => {
    setIsFocused(true);
  };
  const customOnBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.hContainer}>
      <TextInput
        style={styles.textInput}
        value={searchValue}
        onChangeText={text => onChangeSearchValue(text)}
        onFocus={customOnFocus}
        onBlur={customOnBlur}
        keyboardType={'default'}
      />
      <Pressable
        style={styles.searchButton}
        onPress={() => onSearchSubmit(searchValue)}>
        <Search width={17} height={17} fill={'black'} stroke={'black'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default SearchBar;
