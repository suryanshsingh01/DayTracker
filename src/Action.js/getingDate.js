import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';

const GetingDate = ({ onPress, currentDate }) => {
const getMonth = useCallback(() => {
    const options = { month: 'short' };
    return currentDate.toLocaleDateString('en-US', options);
  }, [currentDate]);

  const getYear = useCallback(() => {
    return currentDate.getFullYear(); // returns the full year
  }, [currentDate]);

  return (
    <View>
      <TouchableOpacity style={styles.Datebutton} onPress={onPress}>
        <Text style={styles.month}>{getMonth()},</Text>
        <Text style={styles.year}>{getYear()}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetingDate;

const styles = StyleSheet.create({
  Datebutton: {
    backgroundColor: 'transparent',
    width: '70%',

  },
  month:{
    fontSize: 28,
    fontWeight: 'bold',
  },
  year:{
    fontSize: 20,
    fontWeight: '600'  
  }
});
