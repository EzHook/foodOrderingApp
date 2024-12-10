import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import logo from '../assets/images/mainLogo.png';
import cart from '../assets/images/cart.png';
import {
  BACKGROUND_COLOR,
  FONT_BOLD,
  HEADING_COLOR,
  PRIMARY_COLOR_LIGHT,
} from '../constants/constants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/RootStackParamList';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Welcome, User</Text> */}
      <Image style={styles.logo} source={logo} />
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Image style={styles.logo} source={cart} />
        <Text style={styles.heading}>{cartItems.length}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 5,
    paddingTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: BACKGROUND_COLOR,
  },
  heading: {
    backgroundColor: PRIMARY_COLOR_LIGHT,
    color: BACKGROUND_COLOR,
    borderRadius: 100,
    padding: 2,
    paddingHorizontal: 8,
    bottom: 0,
    right: 0,
    fontSize: 8,
    fontFamily: FONT_BOLD,
    position: 'absolute',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
