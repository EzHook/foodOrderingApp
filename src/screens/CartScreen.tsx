import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  addItemToCart,
  removeItemFromCart,
  decrementItemQuantity,
  clearCart,
  CartItem,
} from '../store/cartSlice';
import SuccessModal from '../components/SuccessModal';
import Header from '../components/Header';
import * as Animatable from 'react-native-animatable';
import {
  BACKGROUND_COLOR,
  FONT_BOLD,
  FONT_EXTRA_BOLD,
  FONT_REGULAR,
  HEADING_COLOR,
  PRIMARY_COLOR_LIGHT,
  SECONDARY_COLOR,
} from '../constants/constants';
import {RootState} from '../store/store';
import SolidButton from '../components/SolidButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootStackParamList';

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

const CartScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<CartScreenNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const deliveryCharge = 50;
    const discount = 0;
    return {
      subtotal,
      deliveryCharge,
      discount,
      total: subtotal + deliveryCharge - discount,
    };
  };

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Main'); // Adjust the route name as per your app's navigation structure
    }, 3000);
  };

  const {subtotal, deliveryCharge, discount, total} = calculateTotal();

  const renderCartItem = ({item}: {item: CartItem}) => (
    <Animatable.View
      animation="fadeInUp"
      duration={600}
      style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          $ {item.price.toString().slice(0, 5)}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => dispatch(decrementItemQuantity(item._id))}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => dispatch(addItemToCart(item))}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  return (
    <Animatable.View animation="fadeIn" duration={800} style={styles.container}>
      <Animatable.View animation="slideInDown" duration={1000}>
        <Header />
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        duration={800}
        style={styles.mainContainer}>
        <Text style={styles.heading}>Order Details</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty!</Text>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={item => item._id}
              renderItem={renderCartItem}
              showsVerticalScrollIndicator={false}
            />
            <Animatable.View
              animation="fadeInUp"
              duration={800}
              delay={200}
              style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Sub-Total</Text>
                <Text style={styles.summaryText}>
                  $ {subtotal.toString().slice(0, 5)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Delivery Charge</Text>
                <Text style={styles.summaryText}>
                  $ {deliveryCharge.toString().slice(0, 5)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Discount</Text>
                <Text style={styles.summaryText}>
                  $ {discount.toString().slice(0, 5)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>
                  $ {total.toString().slice(0, 5)}
                </Text>
              </View>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUp"
              duration={800}
              delay={400}
              style={styles.buttonContainer}>
              <SolidButton text="Place My Order" onPress={handlePlaceOrder} />
            </Animatable.View>
          </>
        )}
      </Animatable.View>
      <SuccessModal
        visible={modalVisible}
        message="Order placed successfully!"
      />
    </Animatable.View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontFamily: FONT_EXTRA_BOLD,
    color: HEADING_COLOR,
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
    color: HEADING_COLOR,
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: HEADING_COLOR,
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: FONT_BOLD,
    color: PRIMARY_COLOR_LIGHT,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOR_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONT_BOLD,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
    marginHorizontal: 10,
  },
  summaryContainer: {
    backgroundColor: PRIMARY_COLOR_LIGHT,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    fontFamily: FONT_BOLD,
    color: 'white',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontFamily: FONT_EXTRA_BOLD,
    color: 'white',
  },
  placeOrderButton: {
    backgroundColor: PRIMARY_COLOR_LIGHT,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONT_EXTRA_BOLD,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    color: HEADING_COLOR,
    marginTop: 20,
  },
});
