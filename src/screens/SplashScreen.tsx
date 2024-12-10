// SplashScreen.tsx
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootStackParamList';
import {
  FONT_BOLD,
  FONT_EXTRA_BOLD,
  HEADING_COLOR,
} from '../constants/constants';

const SplashScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Main');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{scale}],
            opacity, // Animated opacity
          },
        ]}>
        <Image
          source={require('../assets/images/mainLogo.png')} // Replace with your logo
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{scale}], // Animated scaling
            opacity, // Animated opacity
          },
        ]}>
        Food Ordering App
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color for the splash screen
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 181,
    height: 181,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 20,
    fontSize: 36,
    fontFamily: FONT_EXTRA_BOLD,
    color: HEADING_COLOR,
  },
});
