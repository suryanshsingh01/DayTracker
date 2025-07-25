import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList } from 'react-native-gesture-handler';

const DateList = ({ date, onDateChange }) => {
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date || new Date());
  const FlatListRef = useRef(null);


  const generateDays = useMemo(() => {
    const date = selectedDate;
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArr = [];
    for (let i = 0; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      daysArr.push({
        date,
        day: date.toLocaleString('en-us', { weekday: 'short' }), //mon
        fullDate: date?.toLocaleDateString(),
      });
    }

    setDays(daysArr);
       setTimeout(() => {
          handleScroll(selectedDate, daysArr);
         }, 100);
      }, [selectedDate]);

  const handleScroll = useCallback((selectedDate, days) => {
    const index = days.findIndex(
      day => day?.date?.toDateString() === selectedDate?.toDateString(),
    );
    if (FlatListRef?.current && index >= 0) {
      FlatListRef?.current?.scrollToIndex({ index, animated: true,viewPosition: 0.2, });
    }
  }, []);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  const DateItemview = ({ day, date, fullDate }) => {
    const isSelected = date?.toDateString() === selectedDate?.toDateString();

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(date);
          onDateChange(date);
        }}
        style={[styles.dayItem, isSelected && styles.selectedDayItem]}
      >
        <Text style={[styles.days, isSelected && styles.selectedDate]}>{day}</Text>
        <Text style={[styles.dateText, isSelected && styles.selectedDate]}>
          {date?.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={FlatListRef}
        data={days}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <DateItemview {...item} />}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={info => {
          const promiss = new Promise(resolve => setTimeout(resolve, 500));
          promiss.then(() => {
            if (FlatListRef.current) {
              FlatListRef?.current?.scrollToIndex({
                index: info?.index,
                animated: true,
                viewPosition: 0.2,
              });
            }
          });
        }}
      />
    </View>
  );
};

export default DateList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  dayItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    width: 100,
    marginVertical: 5,
    gap: 4,
    color: 'white'
  },
  days: {
    color: 'white',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedDate: {
    color: 'black',
  },
  selectedDayItem: {
    backgroundColor: '#f5b719',
  },
});
