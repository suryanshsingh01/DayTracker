import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

const monthArray = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(0, i);
  return {
    label: date.toLocaleString('en-US', { month: 'long' }),
    index: i-1,
  };
});

const MonthList = ({ onMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const FlatListRef = useRef(null);

  const handleSelectMonth = (index) => {
    setSelectedMonth(index);
    if (onMonthChange) {
      onMonthChange(index);
    }
  };

  const renderMonthItem = ({ item }) => {
    const isSelected = item.index === selectedMonth;

    return (
      <TouchableOpacity
        onPress={() => handleSelectMonth(item.index)}
        style={[styles.dayItem, isSelected && styles.selectedDayItem]}
      >
        <Text style={[styles.days, isSelected && styles.selectedDate]}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={FlatListRef}
        data={monthArray}
        keyExtractor={(item) => item.index.toString()}
        renderItem={renderMonthItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MonthList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 9,
  },
  dayItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    width: 100,
    marginVertical: 5,
   
  },
  days: {
    color: 'white',
    fontSize: 12,
  },
  selectedDate: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedDayItem: {
    backgroundColor: '#f5b719',
  },
});
