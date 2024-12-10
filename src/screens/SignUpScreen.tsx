import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  BACKGROUND_COLOR,
  FONT_BOLD,
  FONT_REGULAR,
  HEADING_COLOR,
  PRIMARY_COLOR_LIGHT,
} from '../constants/constants';
import logo from '../assets/images/mainLogo.png';
import CustomInput from '../components/CustomInput';
import SolidButton from '../components/SolidButton';
import LoadingAnimation from '../components/LoadingAnimation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootStackParamList';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleSignInAccount = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.heading}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter your name"
            value={userName}
            onChangeText={setUserName}
          />
          <CustomInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <SolidButton text="Sign Up" onPress={handleSignUp} />
        <View style={styles.registeredContainer}>
          <Text style={styles.subHeading}>Do you have an account?</Text>
          <TouchableOpacity onPress={handleSignInAccount}>
            <Text
              style={[
                styles.subHeading,
                {
                  color: PRIMARY_COLOR_LIGHT,
                  fontFamily: FONT_BOLD,
                },
              ]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  mainContainer: {
    gap: 20,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  registeredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  subHeading: {
    color: HEADING_COLOR,
    fontSize: 18,
    fontFamily: FONT_REGULAR,
  },
  heading: {
    fontSize: 24,
    color: HEADING_COLOR,
    fontFamily: FONT_BOLD,
    marginTop: 20,
  },
  inputContainer: {
    gap: 20,
    width: '100%',
  },
  logo: {
    height: 107,
    width: 107,
    resizeMode: 'contain',
  },
});
