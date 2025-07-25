import { Button, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MyButton from '../component/myButton';
import MyInputText from '../component/myInputText';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {

  const navigation = useNavigation();
  <StatusBar hidden />
  return (
    <View style={styles.fullContainer}>
      <LinearGradient
                    colors={['#0F2D4D', '#DED1C6']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.gradient}
                  >
      <Image source={require('../assests/images/slogo.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.heading}>Wellcome!</Text>
      <View style={styles.loginContainer}>
        <LinearGradient
                    colors={['#174871', '#DED1C6']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.Logingradient}
                  >
        <Text style={styles.loginHeading}>Login</Text>
        <MyInputText  style={styles.LoginInput} 
          placeholder="Email" 
          placeholderTextColor="white" />
        
        <MyInputText 
          style={styles.PasswordInput}
          placeholder="Password"
          placeholderTextColor='white'
          />
        <MyButton title={'Login'} onPress={() => navigation.navigate('DrawerNavigation')} />
          <Text style={{fontSize:10,marginTop:10,color:'white'}}>Dont have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DrawerNavigation')}>
            <Text style={{ fontWeight: 'bold',fontSize:10,color:'white' }}>Skip please!</Text>
          </TouchableOpacity>
          </LinearGradient>
      </View>
      </LinearGradient>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5e6ff',
  },
  gradient:{
     width: '100%',
     height:'100%',
     alignItems: 'center',
  },
  image:{
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: '#000112',
    borderRadius: 70,
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 100,
  },

  heading: {
     fontSize: 39,
     fontWeight: 'bold',
     marginTop: '20',
     marginBottom: 10,
     textShadowColor: 'rgba(0,0,0,0.5)',
     textShadowOffset: {width: 2.5,height: 2.5},
     textShadowRadius: 6,
     color: 'white'
  },
  loginContainer: {
     width: '80%',
     height: '60%',
     backgroundColor: '#e5dffe',
     borderWidth:1,
     borderColor: 'black',
     borderRadius: 10,
     alignItems: 'center',
     elevation: 10,
     
  },Logingradient:{
    width: '100%',
    height: '100%',
     borderRadius: 10,
     alignItems: 'center',
     elevation: 10,
  },
  LoginInput: {
    width: '80%', 
    borderWidth: 1,
     borderColor: 'black',
     borderRadius: 20,
    margin: 20,
     
  },
  loginHeading:{
     fontSize: 30,
     fontWeight: 'bold',
     marginBottom: 20,
     marginTop: 40,
     color: 'white',
     textShadowColor: 'rgba(0,0,0,0.5)',
     textShadowOffset: {width: 2.5,height: 2.5},
     textShadowRadius: 6,
  },
  PasswordInput:{
      width: '80%', 
    borderWidth: 1,
     borderColor: 'black',
     borderRadius: 20,
     margin: 20,
  }
})