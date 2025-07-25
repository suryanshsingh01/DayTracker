import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { updatetasks } from '../db/database';

const EditTasks = ({ item, closeModal,refreshTasks }) => {

  

    const [task, settask] = useState(item.task);
    const [taskdate, settaskdate] = useState(item.created_at);
    const task_id = item.id;
    const handleAddTask = () => {
        if (!task.trim()) {
            Alert.alert('Validation', 'Please enter a task!');
            return;
        }


   
    //Edit tasks Querry for sql    
  updatetasks(
  task_id,
  task,
  res => {
 

  try {
    Alert.alert('Updated Successfully');  // ✅ This should appear
  } catch (e) {
    console.warn("❌ Alert failed:", e);
  }

  try {
    refreshTasks?.();
  } catch (err) {
    console.warn('❌ Error calling refreshTasks:', err);
  }

  try {
    closeModal?.();
  } catch (err) {
    console.warn('❌ Error calling closeModal:', err);
  }
},
  err => {
    Alert.alert('Error', err.message || 'Update failed');
  }
);

    };
    return (
        <View style={styles.container}>
              <StatusBar hidden />
            <Text style={{fontSize: 24,color: 'white',fontWeight:'bold'}}>Update Task...</Text>
            <View style={styles.datacontainer}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>selectedDate: </Text>
                <Text style={{ fontWeight: '400', fontSize: 14, color: 'white' }}>                 {taskdate}</Text>
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
    )
}

export default EditTasks

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    datacontainer: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#cccccc',
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        gap: 8,
        padding: 10,
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

})