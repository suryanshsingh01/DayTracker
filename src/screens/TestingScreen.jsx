import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomLayout = () => {
  return (
    <View style={styles.container}>
      {/* Outer Box */}
      <View style={styles.outerBox}>
        {/* Top Rounded Rectangle */}
        <View style={styles.topBox} />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Left Tall Rounded Box */}
          <View style={styles.leftTallBox} />

          {/* Right Section */}
          <View style={styles.rightSection}>
            {/* Three Small Squares */}
            <View style={styles.smallSquares}>
              <View style={styles.square} />
              <View style={styles.square} />
              <View style={styles.square} />
            </View>
            {/* Rounded Rectangle Below Squares */}
            <View style={styles.rightBottomBox} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerBox: {
    width: 300,
    height: 450,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
  },
  topBox: {
    height: 70,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    marginBottom: 10,
  },
  bottomSection: {
    flexDirection: 'row',
    flex: 1,
    
  },
  leftTallBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    marginRight: 5,
  },
  rightSection: {
    flex: 1,
  },
  smallSquares: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderWidth: 1,
  },
  square: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },
  rightBottomBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    marginTop: 5,
  },
});

export default CustomLayout;
