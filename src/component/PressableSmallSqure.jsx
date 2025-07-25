import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PressableSmallSquare = ({ onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const options = ['Months', 'Days', 'Years'];

  const handlePress = (index) => {
    setActiveIndex(index);
    console.log(`Pressed ${options[index]}`);
  };

  return (
    <View style={styles.container}>
      {options.map((label, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handlePress(index);
            if (typeof onSelect === 'function') {
              onSelect(label);
            } else {
              console.warn('❌ onSelect is not a function:', onSelect);
            }
          }}
          style={[
            styles.button,
            activeIndex === index && styles.activeButton,
          ]}
        >
          <Text style={[styles.text, activeIndex === index && styles.activeText]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  button: {
    width: '33%',
    height: '100%',

    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#fabb18',
  },
  text: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  activeText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default PressableSmallSquare;
