import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import loader from '../assets/animations/loadingAnimation.json';
import {BACKGROUND_COLOR} from '../constants/constants';

const LoadingAnimation: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={{height: '100%', width: '100%'}}
        source={loader}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
