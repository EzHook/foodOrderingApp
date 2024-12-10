import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SolidButtonProps} from '../types/AuthTypes';
import {
  BACKGROUND_COLOR,
  FONT_BOLD,
  FONT_REGULAR,
  PRIMARY_COLOR,
  PRIMARY_COLOR_LIGHT,
} from '../constants/constants';

const SolidButton: React.FC<SolidButtonProps> = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SolidButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_COLOR_LIGHT,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
  },
  heading: {
    fontSize: 16,
    color: BACKGROUND_COLOR,
    fontFamily: FONT_BOLD,
    // marginTop: 20,
  },
});
