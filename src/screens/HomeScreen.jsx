import { Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Hooks from '../components/hook/hooks';
import { useNavigation } from '@react-navigation/native';
import GetingDate from '../Action.js/getingDate';
import DateList from '../components/DatePicker/DateList';
import RenderItemScreen from '../Action.js/renderitem';
import DatePickerModal from '../components/DatePicker/DatePicker';
import LinearGradient from 'react-native-linear-gradient';
import AddTasks from '../component/AddTasks';
import PressableSmallSqure from '../component/PressableSmallSqure';

import MonthList from '../components/DatePicker/MonthList';
import YearList from '../components/DatePicker/YearList';

const HomeScreen = () => {

  const navigation = useNavigation();
  const [isModalvisible, SetmodalVisible] = useState(false);   // date modal right upper corner
  const [currentDate, setCurrentDate] = Hooks();              //calling the date from hooks
  const [isAddModalvisible, SetAddmodalVisible] = useState(false);     //for Add modal
  const [onDateMonthYear, setonDateMonthYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [SelectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [reloadTrigger, setreloadTrigger] = useState(0);

  <StatusBar hidden />

  useEffect(() => {
    const updated = new Date(currentDate);
    updated.setMonth(currentMonth);
    updated.setFullYear(SelectedYear);
    setCurrentDate(updated);
  },[currentMonth,SelectedYear]);

  const refreshTasks = () => {
    console.warn("🔁 Triggering task refresh");
    setreloadTrigger(prev => prev + 1); // this will cause re-render of RenderItemScreen
  };

  const handleMonthChange = (index) => {
    setCurrentMonth(index);
    
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
   
  }

  return (
    <View style={styles.fullContainer}>

      <LinearGradient
        colors={['#002063', '#A3A3A3']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.headingcontainer}>
          <View style={{ width: '40%', justifyContent: 'center', paddingLeft: 10, borderRadius: 16 ,}}>
            <GetingDate
              onPress={() => SetmodalVisible(true)}
              currentDate={currentDate}
            />
          </View>
          <View style={{ width: '61%', height: '102%', justifyContent: 'center', alignItems: 'flex-end', borderRadius: 15, paddingRight: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Arise.</Text>
            <Text style={{ fontWeight: '600', fontSize: 14 }}>What are YOUR plans</Text>
            <Text style={{ fontWeight: '600' }}>Today </Text>
          </View>
        </View>

        <View style={styles.bottomscreen}>
          <View style={styles.datecontainer}>
            {onDateMonthYear === 'Years' ? (
              <YearList onYearChange={handleYearChange} />
            ) : onDateMonthYear === 'Months' ? (
              <MonthList onMonthChange={handleMonthChange} />
            ) : (
              <DateList date={currentDate}
                onDateChange={date => setCurrentDate(date)}
              />
            )
            }
          </View>
          <View style={styles.rightSection}>
            <View style={styles.daymonthyear}>
              <PressableSmallSqure onSelect={(selectedLabel) => {
                console.log('Selected:', selectedLabel);
                setonDateMonthYear(selectedLabel);
              }} />
            </View>


            <View style={styles.itemcontainer}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10, paddingTop: 9 }}>My Tasks</Text>
              <RenderItemScreen date={currentDate} reloadTrigger={reloadTrigger} />
              <TouchableOpacity

                style={styles.button}
                onPress={() => SetAddmodalVisible(true)}
              >
                <Text style={styles.buttonText}>+ ADD TASKS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <DatePickerModal
          isVisible={isModalvisible}
          onClose={() => SetmodalVisible(false)}
          handleDateChange={date => {
            setCurrentDate(date);
            SetmodalVisible(false);
          }}
          currentDate={currentDate}
        />

        <Modal
          visible={isAddModalvisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => SetAddmodalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <AddTasks
              formatedDate={currentDate}
              closeModal={() => SetAddmodalVisible(false)}
              refreshTasks={refreshTasks}
            />

          </View>
        </Modal>

      </LinearGradient>
    </View>
  )
}
// <CreateTask onPress={<Text>hi</Text>}/>
export default HomeScreen

const styles = StyleSheet.create({
  fullContainer: {

  },
  gradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#aaa2ad',
    gap: 5,
    paddingTop: 25,
  },
  headingcontainer: {
    flexDirection: 'row',

    width: '97%',
    height: '20%',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 10,
  },
  datecontainer: {
    width: '30%',
    height: '78%',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'black',
    elevation: 10,
  },
  rightSection: {
    width: '105%',
    height: '100%'
  },
  daymonthyear: {
    width: '60%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 6,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
  },
  itemcontainer: {
    width: '65%',
    height: '71%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    elevation: 10,


  },
  bottomscreen: {
    flexDirection: 'row',
    width: '97%',
    height: '100%',
    gap: 8,
  },
  button: {
    width: 90,
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    padding: 20,
  }

});