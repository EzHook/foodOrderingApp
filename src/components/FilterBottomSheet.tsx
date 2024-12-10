// File: FilterBottomSheet.tsx
import React, {forwardRef, useState, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SolidButton from './SolidButton';
import {
  FONT_BOLD,
  HEADING_COLOR,
  PRIMARY_COLOR_LIGHT,
} from '../constants/constants';

interface FilterBottomSheetProps {
  title?: string;
  onApplyFilters: (filteredData: any[]) => void;
  data: {
    _id: string;
    name: string;
    type: string;
    price: number;
    description: string;
    image: string;
  }[];
}

const FilterBottomSheet = forwardRef<typeof RBSheet, FilterBottomSheetProps>(
  ({title = 'Filters', onApplyFilters, data}, ref: any) => {
    // Extract unique product types dynamically
    const productTypes = useMemo(
      () => Array.from(new Set(data.map(item => item.type))),
      [data],
    );

    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string | null>(null); // 'low-high', 'high-low', 'none'

    const applyFilters = () => {
      let filteredData = data;

      // Apply type filter
      if (selectedType) {
        filteredData = filteredData.filter(item => item.type === selectedType);
      }

      // Apply sorting
      if (sortOption === 'low-high') {
        filteredData = filteredData.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'high-low') {
        filteredData = filteredData.sort((a, b) => b.price - a.price);
      }

      // Pass the filtered data back to the parent
      onApplyFilters(filteredData);
    };

    return (
      <RBSheet
        ref={ref}
        height={400}
        openDuration={250}
        customStyles={{
          container: styles.sheetContainer,
          draggableIcon: styles.draggableIcon,
        }}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.seperator} />

          {/* Type Filter */}
          <Text style={styles.sectionTitle}>Type</Text>
          <View style={styles.filterRow}>
            {productTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterOption,
                  selectedType === type && styles.selectedFilterOption,
                ]}
                onPress={() =>
                  setSelectedType(selectedType === type ? null : type)
                }>
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedType === type && styles.selectedFilterOptionText,
                  ]}>
                  {type.slice(3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Sorting */}
          <Text style={styles.sectionTitle}>Sort by Price</Text>
          <View style={styles.filterRow}>
            {['low-high', 'high-low', 'none'].map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  sortOption === option && styles.selectedFilterOption,
                ]}
                onPress={() => setSortOption(option)}>
                <Text
                  style={[
                    styles.filterOptionText,
                    sortOption === option && styles.selectedFilterOptionText,
                  ]}>
                  {option === 'low-high'
                    ? 'Low to High'
                    : option === 'high-low'
                    ? 'High to Low'
                    : 'None'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Apply Filters Button */}
          <SolidButton onPress={applyFilters} text="Apply Filters" />
        </View>
      </RBSheet>
    );
  },
);

export default FilterBottomSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  draggableIcon: {
    backgroundColor: '#ccc',
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seperator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  filterOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedFilterOption: {
    backgroundColor: PRIMARY_COLOR_LIGHT,
    borderColor: PRIMARY_COLOR_LIGHT,
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: FONT_BOLD,
    color: HEADING_COLOR,
  },
  selectedFilterOptionText: {
    color: '#fff',
  },
});
