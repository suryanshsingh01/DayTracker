import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { inserttasks } from '../db/database';
import Hooks from '../components/hook/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import getTasksLIsts from '../Action.js/renderitem'
const AddTasks = ({formatedDate, closeModal, refreshTasks }) => {
  const [task, settask] = useState('');
  const selectedDate = new Date(formatedDate).toDateString();




  const handleAddTask = () => {
    if (!task.trim()) {
      Alert.alert('Validation', 'Please enter a task!');
      return;
    }

    inserttasks(
      task,
      selectedDate,
      res => {
       Alert.alert('Success', 'Task added', [
  {
    text: 'OK',
    onPress: () => {
      refreshTasks?.(); // ✅ Now guaranteed to run
      closeModal();     // ✅ Close modal after alert
    },
  },
]);
      },
      err => {
        console.warn('error', err);
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AddTasks</Text>
      <View style={styles.datacontainer}>
        <Text style={{fontSize:14,fontWeight:'600',color:'white'}}>selectedDate: </Text>
      <Text style={{fontWeight: '400',fontSize:14,color:'white'}}>                 {selectedDate}</Text>
      </View>
      <TextInput
        value={task}
        onChangeText={settask}
        style={styles.TextInput}
        placeholder="Enter the task..."
        placeholderTextColor="white"
      />
      <TouchableOpacity onPress={handleAddTask} style={styles.submitbutton}>
        <Text style={styles.subbutton}>Submit</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={closeModal} style={styles.submitbutton}>
        <Text style={styles.subbutton}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTasks;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  heading:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  TextInput: {
    width: '80%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingLeft: 20,
    color: 'white',
  },
  submitbutton: {
    width: '70%',
    height: 50,
    marginTop: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  subbutton: {
    fontSize: 20,
    color: 'black',
  },
  datacontainer:{
    width: '80%',
    borderWidth: 1,
    borderColor: '#cccccc',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    gap: 8,
    padding: 10,
  }
});
