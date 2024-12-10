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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootStackParamList';
import {useNavigation} from '@react-navigation/native';

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return <LoadingAnimation />;
  }
  const handleSignUpAccount = () => {
    navigation.navigate('SignUp');
  };
  const handleSignIn = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.heading}>Sign In</Text>
        <View style={styles.inputContainer}>
          <View style={styles.signIncontainer}>
            <Text style={styles.inputHeading}>Email</Text>
            <CustomInput
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.signIncontainer}>
            <Text style={styles.inputHeading}>Password</Text>
            <CustomInput
              placeholder="****"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>
        </View>
        <SolidButton text="Sign In" onPress={handleSignIn} />
        <View style={styles.registeredContainer}>
          <Text style={styles.subHeading}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUpAccount}>
            <Text
              style={[
                styles.subHeading,
                {
                  color: PRIMARY_COLOR_LIGHT,
                  fontFamily: FONT_BOLD,
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  inputHeading: {
    color: HEADING_COLOR,
    fontSize: 14,
    fontFamily: FONT_BOLD,
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
  signIncontainer: {
    gap: 10,
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
