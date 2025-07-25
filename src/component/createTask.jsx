import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
// or any other family like FontAwesome, MaterialIcons, etc.


const CreateTask = ({onPress}) => {

  const [isHovered, setHovered] = useState(false);
  
 

  return (
    <Pressable
     onPress={onPress}
    
     style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonExpanded,
         { opacity: 0.7 },
     ]}
    >
     <Icon name="plus" size={20} color="white" />   
      <Text style={styles.text}>  Create</Text>
    </Pressable>
  )
}

export default CreateTask

const styles = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: '#6200EE',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 10,
        width: 50,
        overflow: 'hidden',
    },
    buttonExpanded: {
        width: 120,
    },
    text: {
        color: 'white',
        fontSize: 16,
    }
})