import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen';
import ExtraScreen from '../screens/ExtraScreen';
import 'react-native-gesture-handler'; // 👈 MUST be at the top
import ImagePlay from '../screens/ImagePlay';
import CustomLayout from '../screens/TestingScreen';



const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName='HomeScreen' screenOptions={{drawerPosition: 'right',headerShown: false}}>
      <Drawer.Screen  name = "HomeScreen" component={HomeScreen}/>
      <Drawer.Screen  name = "ExtraScreen" component={ExtraScreen} />
      <Drawer.Screen name = "ImagePlay" component={ImagePlay} />
      <Drawer.Screen name = "Testing" component={CustomLayout} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation

const styles = StyleSheet.create({})