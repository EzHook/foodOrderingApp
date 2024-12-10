import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import filter from '../assets/images/filter.png';
import {FONT_BOLD, PRIMARY_COLOR_LIGHT} from '../constants/constants';
import {FilterButtonProps} from '../types/AuthTypes';

const FilterComponent: React.FC<FilterButtonProps> = ({onPress, selected}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.heading}>Filters</Text>
      <Image style={styles.filterImage} source={filter} />
    </TouchableOpacity>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR_LIGHT,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 14,
    color: PRIMARY_COLOR_LIGHT,
    fontFamily: FONT_BOLD,
  },
  filterImage: {
    height: 20,
    width: 20,
    tintColor: PRIMARY_COLOR_LIGHT,
    resizeMode: 'cover',
  },
});
