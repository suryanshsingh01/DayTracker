import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const YearList = ({ onYearChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i); // 50 past, 50 future
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const flatListRef = useRef(null);

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    onYearChange?.(year);
  };

  useEffect(() => {
    const index = years.indexOf(selectedYear);
    if (index !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }, 100); // slight delay for smoother experience
    }
  }, [selectedYear]);

  const renderItem = ({ item }) => {
    const isSelected = item === selectedYear;

    return (
      <TouchableOpacity
        style={[styles.yearItem, isSelected && styles.selectedItem]}
        onPress={() => handleSelectYear(item)}
      >
        <Text style={[styles.yearText, isSelected && styles.selectedText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={years}
      keyExtractor={(item) => item.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: 60,
        offset: 60 * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  yearItem: {
    padding: 15,
    alignItems: 'center',
  },
  yearText: {
    fontSize: 18,
    color: 'white',
  },
  selectedItem: {
    backgroundColor: '#f5b719',
    borderRadius: 10,
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default YearList;
