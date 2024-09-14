import { Button } from '@/components/Button';
import DateTimePicker from '@/components/DateTimePicker';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { eventService } from '@/services/events';
import { useNavigation, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Select } from 'native-base';
import DatePicker from 'react-datepicker';

export default function NewEvent() {
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());

  const handleWebDateChange = (date: Date | null) => {
    if (date) {
      var today = new Date();
      var yesterday = today.getDate() - 1;
      // yesterday.setDate(yesterday.getDate() - 1);
      today.setHours(0, 0, 0, 0);

      if (date > today) {
        setDate(date); // Set the selected date if it's greater than today's date
      } else {
        alert("The selected date must not be before today.");
      }
    }
  };



  async function onSubmit() {
    try {
      setIsSubmitting(true);

      await eventService.createOne(name, location, date.toISOString());
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onChangeDate(date?: Date) {
    setDate(date || new Date());
  }

  useEffect(() => {
    navigation.setOptions({ headerTitle: "New Buffet Reservation" });
  }, []);

  return (
    <VStack m={20} flex={1} gap={30}>

      {/* <VStack gap={ 5 }>
        <Text ml={ 10 } fontSize={ 14 } color="gray">Name</Text>
        <Input
          value={ name }
          onChangeText={ setName }
          placeholder="Name"
          placeholderTextColor="darkgray"
          h={ 48 }
          p={ 14 }
        />
      </VStack> */}

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Number of Seats</Text>
        <Select placeholder='Select one' height={45} fontSize={"md"} backgroundColor={"#f9f9f9"} borderColor={"#000"}>
          <Select.Item label="1" value="1" />
          <Select.Item label="2" value="2" />
          <Select.Item label="3" value="3" />
          <Select.Item label="4" value="4" />
          <Select.Item label="5" value="5" />
        </Select>
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Timing</Text>
        <Select placeholder='Select one' height={45} fontSize={"md"} backgroundColor={"#f9f9f9"} borderColor={"#000"}>
          <Select.Item label="Breakfast" value="Breakfast" />
          <Select.Item label="Lunch" value="Lunch" />
          <Select.Item label="Dinner" value="Dinner" />
        </Select>
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Date</Text>
        {Platform.OS === 'web' ? (
          <DatePicker
            // showIcon
            selected={date}
            onChange={handleWebDateChange}
            dateFormat="dd/MM/yyyy"
            className="react-datepicker-wrapper"
            customInput={<input style={customInputStyles} />}
          // style={styles.input}
          />) : (
          <DateTimePicker onChange={onChangeDate} currentDate={date} />)}
      </VStack>


      <Button
        mt={"auto"}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={onSubmit}
      >
        Book Reservation
      </Button>

    </VStack>
  );
};

const customInputStyles = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #000',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '16px',
  height: 50,
  width: '100%',
  boxSizing: 'border-box' as const, // Ensure padding doesn't affect width
  outline: 'none', // Remove default input field outline
  marginBottom: 10,
};
