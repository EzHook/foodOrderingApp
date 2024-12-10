import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {FONT_REGULAR, HEADING_COLOR} from '../constants/constants';
import {CustomInputProps, SearchBarProps} from '../types/AuthTypes';
import search from '../assets/images/search.png';

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={search} style={styles.searchIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  searchIcon: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    color: HEADING_COLOR,
  },
});
