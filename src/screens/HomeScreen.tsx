import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterComponent from '../components/FilterComponent';
import {
  BACKGROUND_COLOR,
  FONT_BOLD,
  HEADING_COLOR,
} from '../constants/constants';
import {FoodItem} from '../types/Data';
import FoodItemComponent from '../components/FoodItemComponent';
import {HomeScreenService} from '../services/homeScreenServices';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootStackParamList';
import FilterBottomSheet from '../components/FilterBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import LoadingAnimation from '../components/LoadingAnimation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [filteredData, setFilteredData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const filterRef = React.useRef<any>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);
        const data = await HomeScreenService.getFoodData();
        setFoodData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching food data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  const handleOnApplyFilters = (filterData: FoodItem[]) => {
    setFilteredData(filterData);
    filterRef.current?.close();
  };

  const handleFilterPress = () => {
    filterRef.current?.open();
  };

  // Filtered data based on search query
  const searchedData = filteredData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return <LoadingAnimation />;
  }
  const handleItemPress = (id: string) => {
    navigation.navigate('ItemDetail', {id});
  };

  return (
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      style={styles.container}>
      <Header />
      <Animatable.View
        animation="slideInDown"
        duration={800}
        delay={200}
        style={styles.FilterContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for Food"
        />
        <FilterComponent onPress={handleFilterPress} />
      </Animatable.View>

      {/* Food Section */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={styles.mainContainer}>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <Animatable.View
            animation="zoomIn"
            duration={700}
            style={styles.foodContainer}>
            <FlatList
              data={searchedData}
              keyExtractor={item => item._id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Animatable.View
                  animation="pulse"
                  duration={800}
                  // iterationCount="infinite"
                  delay={300}>
                  <FoodItemComponent item={item} onPress={handleItemPress} />
                </Animatable.View>
              )}
              ListEmptyComponent={
                <Animatable.Text
                  animation="fadeIn"
                  duration={1000}
                  style={styles.emptyText}>
                  No food items found
                </Animatable.Text>
              }
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.flatListContent}
            />
          </Animatable.View>
        )}
      </Animatable.View>

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        onApplyFilters={handleOnApplyFilters}
        data={foodData}
        ref={filterRef}
      />
    </Animatable.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  foodContainer: {
    height: '100%',
  },
  mainContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  FilterContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  emptyText: {
    textAlign: 'center',
    fontFamily: FONT_BOLD,
    fontSize: 16,
    color: HEADING_COLOR,
    marginTop: 20,
  },
  flatListContent: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
