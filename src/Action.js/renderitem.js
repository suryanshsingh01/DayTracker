import { Animated,Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { deleteCourse, gettasks } from '../db/database';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import EditTasks from '../component/EditTasks';

const RenderItemScreen = ({ date, reloadTrigger }) => {
  const [taskses, settastses] = useState([]);
  const selectedDate = date;
  const [EditMOdalVisibale,setEditModalVisibale] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);          //for storing the item to send in edit
  const scrollY = useRef(new Animated.Value(0)).current;

  // tells if date is object// const formattedDate = dateObj.toISOString().split('T')[0]; //change the formate of date to 'YYYY-MM-DD' but commented it because of error
  // month is 0-based
  const gettasksForDate = date => {
    const dateObj = new Date(date); 
    if (isNaN(dateObj.getTime())) {
      console.warn('❌ Invalid date:', rawDate);
      return;
    }
    const date1 = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    gettasks(formattedDate, settastses, err => console.warn(err));
  };


  useFocusEffect(
    useCallback(() => {
      getTasksLIsts();
    }, [selectedDate, reloadTrigger]));

  const getTasksLIsts=()=>{
       gettasksForDate(selectedDate);
  }

//Edit button//Delete button//Modal for editing the data

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.taskItem}>
        <View style={styles.hrline}>
          <Text style={styles.tasksname}>
            {item.task}
          </Text>
        </View>
        <View style={styles.downcontainer}>
          <View style={styles.iconcontainer}>
            <TouchableOpacity                                 
                onPress={() =>{ 
                  setSelectedItem(item);
                  setEditModalVisibale(true);
                }}
            >
              <Icon name="edit" size={15} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity                                
            onPress={() => {
              deleteCourse(
                item.id,
                (res) => { Alert.alert("Success","Task deleted successfully"); getTasksLIsts();},
                (err) => { Alert.alert("err:", "failed to delete task"); },
              );
            }}>
              <Icon name="trash-2" size={15} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.datecontainer}>
            <Text style={styles.tasksDate}>{item.created_at}</Text>
          </View>
        </View>
       </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        data={taskses}
        contentContainerStyle={{ paddingTop: 6}}
        onScroll={Animated.event(
          [{ nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true } 
        )}
        renderItem={renderItem}
       
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks for this date.</Text>
        }
      />
       {EditMOdalVisibale && selectedItem && (
        <Modal                                
          visible={EditMOdalVisibale}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditModalVisibale(false)}
        >
          <View style={styles.modalOverlay}>
            {selectedItem && (<EditTasks  
               item = {selectedItem}
               closeModal={()=> setEditModalVisibale(false)}
               refreshTasks = {getTasksLIsts}
            />
          )}
          </View>
        </Modal>
        )}
      
    </View>
  );
};

export default RenderItemScreen;

const styles = StyleSheet.create({
  taskItem: {
    width: '95%',
    height: 85,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fabb18',
    marginTop: 20,
    elevation: 10,
  },
  tasksname: {
    fontWeight: '600',
    fontSize: 14,
  },
  tasksDate: {
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
  },
  hrline: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    justifyContent: 'space-between',
    paddingLeft: 4
  },
  iconcontainer: {
    width: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 5,
  },
  datecontainer: {
    width: '50%',
    paddingRight: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  downcontainer: {
    width: '100%',
    paddingLeft: 7,
    paddingRight: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
   modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  }
});
