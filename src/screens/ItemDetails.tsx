import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Header from '../components/Header';
import {
  BACKGROUND_COLOR,
  FONT_BOLD,
  FONT_REGULAR,
  HEADING_COLOR,
  PRIMARY_COLOR_LIGHT,
} from '../constants/constants';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/RootStackParamList';
import {FoodItem} from '../types/Data';
import {HomeScreenService} from '../services/homeScreenServices';
import LoadingAnimation from '../components/LoadingAnimation';
import SolidButton from '../components/SolidButton';
import {addItemToCart} from '../store/cartSlice';
import {useDispatch} from 'react-redux';

type ItemDetailsRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>;

const ItemDetails: React.FC = () => {
  const route = useRoute<ItemDetailsRouteProp>();
  const {id} = route.params;
  const dispatch = useDispatch();
  const [foodDetails, setFoodDetails] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getFoodDetails = async (id: string) => {
    try {
      const response = await HomeScreenService.getFoodDetails(id);
      setFoodDetails(response);
    } catch (err) {
      setError('Failed to fetch food details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getFoodDetails(id);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingAnimation />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header />
        <Animatable.Text animation="shake" style={styles.errorText}>
          {error}
        </Animatable.Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (foodDetails) {
      dispatch(addItemToCart(foodDetails));
    }
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Animatable.View
          animation="fadeInDown"
          duration={600}
          style={styles.imageContainer}>
          {foodDetails?.image ? (
            <Image source={{uri: foodDetails.image}} style={styles.image} />
          ) : (
            <Animatable.Text
              animation="fadeIn"
              duration={1000}
              style={styles.noImageText}>
              No Image Available
            </Animatable.Text>
          )}
        </Animatable.View>
        <Animatable.View
          animation="slideInUp"
          duration={800}
          style={styles.detailsContainer}>
          <Animatable.View
            animation="zoomIn"
            duration={800}
            style={styles.headerContainer}>
            <Text style={styles.card}>Popular</Text>
            <View style={styles.innerContainer}>
              <Image
                style={styles.icon}
                source={require('../assets/images/heart.png')}
              />
              <Image
                style={styles.icon}
                source={require('../assets/images/location.png')}
              />
            </View>
          </Animatable.View>
          <View style={styles.descriptionContainer}>
            <Animatable.Text animation="fadeInLeft" style={styles.name}>
              {foodDetails?.name}
            </Animatable.Text>
            <Animatable.Text
              animation="fadeInLeft"
              delay={200}
              style={styles.description}>
              {foodDetails?.description}
            </Animatable.Text>
            <Animatable.Text
              animation="fadeInLeft"
              delay={400}
              style={styles.price}>
              Price: ${foodDetails?.price.toFixed(2)}
            </Animatable.Text>
          </View>
          <Animatable.View
            animation="bounceIn"
            delay={600}
            style={styles.buttonContainer}>
            <SolidButton text="Add to Cart" onPress={handleAddToCart} />
          </Animatable.View>
        </Animatable.View>
      </ScrollView>
    </Animatable.View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  scrollViewContent: {
    paddingBottom: 20,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  descriptionContainer: {
    gap: 10,
  },
  card: {
    padding: 10,
    backgroundColor: PRIMARY_COLOR_LIGHT,
    color: BACKGROUND_COLOR,
    borderRadius: 8,
  },
  icon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 16,
    color: HEADING_COLOR,
    marginTop: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    elevation: 2,
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontFamily: FONT_BOLD,
    color: HEADING_COLOR,
  },
  description: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    letterSpacing: 0.75,
    lineHeight: 20,
    color: HEADING_COLOR,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontFamily: FONT_BOLD,
    color: HEADING_COLOR,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
