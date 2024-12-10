import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {FoodItem} from '../types/Data';
import {
  FONT_BOLD,
  FONT_MEDIUM,
  HEADING_COLOR,
  SECONDARY_COLOR,
} from '../constants/constants';

interface FoodItemProps {
  item: FoodItem;
  onPress: (id: string) => void;
}

const FoodItemComponent: React.FC<FoodItemProps> = ({item, onPress}) => {
  return (
    <Animatable.View animation="fadeIn" duration={1000} style={styles.foodItem}>
      <TouchableOpacity onPress={() => onPress(item._id)}>
        <Image source={{uri: item.image}} style={styles.foodImage} />
        <View style={styles.foodDetails}>
          <Text numberOfLines={1} style={styles.foodName}>
            {item.name}
          </Text>
          <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default FoodItemComponent;

const styles = StyleSheet.create({
  foodItem: {
    alignItems: 'center',
    width: 172,
    height: 224,
    backgroundColor: '#fff',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
  touchable: {
    flexDirection: 'row',
  },
  foodImage: {
    width: 162,
    height: 152,
    resizeMode: 'cover',
    borderRadius: 10,
    // marginRight: 10,
  },
  foodDetails: {
    // flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
  },
  foodName: {
    fontSize: 18,
    fontFamily: FONT_BOLD,
    color: HEADING_COLOR,
  },
  foodPrice: {
    fontSize: 16,
    color: '#707070',
    fontFamily: FONT_MEDIUM,
    // marginBottom: 5,
  },
  foodDescription: {
    fontSize: 12,
    color: '#666',
  },
});
