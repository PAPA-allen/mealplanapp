import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';

const HomeScreen = () => {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf('week');
  const [date, setDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const renderWeekDates = startOfWeek => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, 'days');

      const formattedDate = date.format('ddd DD');

      const isCurrentDate = date.isSame(currentDate, 'day');

      weekDates.push(
        <View
          key={i}
          style={{flexDirection: 'row', gap: 12, marginVertical: 10}}>
          <View
            style={[
              {
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: 'white',
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },

              isCurrentDate && {backgroundColor: 'black'},
            ]}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isCurrentDate ? 'white' : 'black',
              }}>
              {date.format('DD')}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isCurrentDate ? 'white' : 'black',
              }}>
              {date.format('ddd')}
            </Text>
          </View>
          <TouchableOpacity
            key={i} // Ensure each TouchableOpacity has a unique key
            style={[
              {
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 10,
                width: '85%',
                height: 80,
              },
            ]}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '600',
                color: 'gray',
              }}>
              There is no Menu
            </Text>
            <TouchableOpacity style={{position:"absolute", bottom:5, right:30}}>
                <Text style={{fontSize:10, fontWeight:"500", color:"gray"}}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position:"absolute", bottom:5, right:100}}>
                <Text style={{fontSize:10, fontWeight:"500", color:"gray"}}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>,
      );
    }
    return weekDates;
  };

  const renderWeeks = numWeeks => {
    let weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      const weekStartDate = startOfWeek.clone().add(i * 7, 'days');
      weeks.push(
        <View key={i}>
          <Text>{weekStartDate.format('DD MMM')}</Text>
          <Text>{renderWeekDates(weekStartDate)}</Text>
        </View>,
      );
    }
    return weeks;
  };

  return (
    <ScrollView style={{marginTop: 50}}>
      <View style={{flex: 1, padding: 12}}>{renderWeeks(3)}</View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
