import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const MyInputText = ({
  style,
  placeholder,
  placeholderTextColor = "#aaa",
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  ...rest
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      {...rest}
    />
  )
}

export default MyInputText

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: 'white',
  }
})
