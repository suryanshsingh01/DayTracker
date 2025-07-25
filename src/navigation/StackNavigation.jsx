import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigation from './DrawerNavigation';
import AddTasks from '../component/AddTasks';




const Stack = createNativeStackNavigator();

const StackNavigation = () => {
   
  return (
      <Stack.Navigator initialRouteName='LoginScreen'>
        
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='DrawerNavigation' component={DrawerNavigation} options={{headerShown:false}}/>
        <Stack.Screen name='AddTasks' component={AddTasks} />
      </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})