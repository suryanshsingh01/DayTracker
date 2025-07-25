import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

const ExtraScreen = () => {

  const width= useSharedValue(100);

  const handlePress = () =>{
    width.value = withSpring(width.value + 50);
  }

  return (
    <View style={{flex:1}}>
      <Image source={require('../assests/images/c18.png')} style={{width:'100%',height:'60%'}}/>
      <View style={styles.container}>
      <LinearGradient
        colors={['pink', 'white']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text>Pink to White Gradient</Text>
      </LinearGradient>

      <Animated.View 
       style={{
        width,
        height: 100,
        backgroundColor: 'violet',
       }}
      />
      <Button onPress={handlePress} title="click me" />
    </View>
    </View>
    
  )
}

export default ExtraScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gradient: {
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})