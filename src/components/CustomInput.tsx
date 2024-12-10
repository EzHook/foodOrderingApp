import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {FONT_REGULAR, HEADING_COLOR} from '../constants/constants';
import {CustomInputProps} from '../types/AuthTypes';

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    color: HEADING_COLOR,
  },
});
