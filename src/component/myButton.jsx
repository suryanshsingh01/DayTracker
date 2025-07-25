import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hoverGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/hoverGesture'


const MyButton = ({title, onPress}) => {
  return (
     <Pressable 
     style={({ pressed }) => [
      styles.btn,
      pressed && styles.btn_pressed
     ]
     } onPress={onPress}>
        <Text style={styles.btnText}>{title}</Text>
     </Pressable>
  )
}

export default MyButton

const styles = StyleSheet.create({
    btn: {
      width: '50%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#133d9c",
      borderRadius: 20,
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#000112",
    },
    btn_pressed:{
      opacity: .8,
      width:'51%',
      height: 55,
      backgroundColor: '#4985fb',
      borderWidth:1,
      borderColor:'#000112'
                },
    btnText:{
        color: 'white',
        fontSize: 16,
    }
    
})