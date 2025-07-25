/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import 'react-native-gesture-handler'; // 👈 MUST be at the top
import { useEffect } from 'react';
import RN_SplashScreen from 'react-native-splash-screen'
import { runMigrations } from './src/db/migrationManager';



function App() {
  const isDarkMode = useColorScheme() === 'dark';
    <StatusBar hidden />
  useEffect(() =>{
    runMigrations();
  },[]);
 
  return (
    <View style={styles.container}>
       <StatusBar hidden />
       <NavigationContainer
        onReady={()=>{
              RN_SplashScreen.hide();
        }} >
        <StackNavigation />
       </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  
  },
});

export default App;
