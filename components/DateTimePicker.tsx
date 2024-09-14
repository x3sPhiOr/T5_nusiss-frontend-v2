import React from 'react'
import { View, TextInput, Platform } from 'react-native'
import { Button } from './Button';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Text } from './Text';
import { HStack } from './HStack';

interface DateTimePickerProps {
  onChange: (date: Date) => void;  
  currentDate: Date;
}

export default function DateTimePickers(props: DateTimePickerProps) {
  if (Platform.OS === 'android') {
    return <AndroidDateTimePicker {...props} />;
  }

  if (Platform.OS === 'ios') {
    return <IOSDateTimePicker {...props} />;
  }

  // if (Platform.OS === 'web') {
  //   return <WebDateTimePicker {...props} />;
  // }

  return null;
}

export const AndroidDateTimePicker = ({ onChange, currentDate }: DateTimePickerProps) => {
  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: (_, date?: Date) => onChange(date || new Date()),
      mode: "date",
    });
  };

  return (
    <HStack p={10} alignItems='center' justifyContent='space-between'>
      <Text>{ currentDate.toLocaleDateString() }</Text>
      <Button variant='outlined' onPress={showDatepicker}>Open Calendar</Button>
    </HStack>
  );
};

export const IOSDateTimePicker = ({ onChange, currentDate }: DateTimePickerProps) => {
  return (
    <RNDateTimePicker
      style={ { alignSelf: "flex-start" } }
      accentColor='black'
      minimumDate={ new Date() }
      value={ currentDate }
      mode={ "date" }
      display='default'
      onChange={ (_, date) => onChange(date || new Date()) }
    />
  )
}


// Web date picker component
export const WebDateTimePicker = ({ onChange, currentDate }: DateTimePickerProps) => {
  const handleDateChange = () => {
    const selectedDate = new Date();
    onChange(selectedDate);
  };

  return (
    <View>
      <Text>{currentDate.toLocaleDateString()}</Text>
      <TextInput
        style={{ padding: 10, borderColor: 'gray', borderWidth: 1 }}
        // type="date"
        value={currentDate.toISOString().split('T')[0]} // Format the date for the web input
        onChange={handleDateChange}
      />
    </View>
  );
};
