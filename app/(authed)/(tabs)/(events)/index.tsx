import { Button } from '@/components/Button';
import DateTimePicker from '@/components/DateTimePicker';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { eventService } from '@/services/events';
import { useNavigation, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Select, View } from 'native-base';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import { commonDropdownStyles } from '@/styles/commonStyles';

export default function NewEvent() {
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [name, setName] = useState('');
  // const [location, setLocation] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(""); // Number of seats
  const [timing, setTiming] = useState(""); // Timing (breakfast, lunch, dinner)
  const [date, setDate] = useState(new Date()); // Date of the reservation
  const [errors, setErrors] = useState<Errors>({ seats: false, timing: false, date: false });

  type Errors = {
    seats: boolean;
    timing: boolean;
    date: boolean;
  };

  // Handle dropdown changes
  const handleSeatChange = (value: string) => {
    setNumberOfSeats(value);
    setErrors({ ...errors, seats: false });
  };

  const handleTimingChange = (value: string) => {
    setTiming(value);
    setErrors({ ...errors, timing: false });
  };

  const handleWebDateChange = (date: Date | null) => {
    console.log(1);
    if (date) {
      var today = new Date();
      var yesterday = today.getDate() - 1;
      // yesterday.setDate(yesterday.getDate() - 1);
      today.setHours(0, 0, 0, 0);

      if (date > today) {
        setDate(date); // Set the selected date if it's greater than today's date
        console.log(date);
        setErrors({ ...errors, date: false });
      } else {
        alert("The selected date must not be before today.");
      }
    }
  };

  function onChangeDate(date?: Date) {
    setDate(date || new Date());
    setErrors({ ...errors, date: false });
  }



  async function handleSubmit() {
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Form is valid', { numberOfSeats, timing, date });
      setIsSubmitting(true);

        // testing
        // var test = JSON.stringify({
        //   ReservationDate: date.toISOString(),
        //   Timing: timing,
        //   NumberOfTables: 1,
        //   NumberOfSeats: parseInt(numberOfSeats),
        //   CustomerID: 1 //TODO need change subsequently
        // })
        
        // console.log(test);
      //   setIsSubmitting(false);
      // }
    //   Post APIs 
      try {
        setIsSubmitting(true);

        var test = JSON.stringify({
          ReservationDate: date.toISOString(),
          Timing: timing,
          NumberOfTables: 0,
          NumberOfSeats: parseInt(numberOfSeats),
          CustomerID: 1
        })
        console.log(test);

        // await eventService.createOne(name, location, date.toISOString());
        // router.back();
        // POST API call
        const response = await fetch("https://486c-119-74-201-136.ngrok-free.app/Reservations/v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ReservationDate: date.toISOString(),
            Timing: timing,
            NumberOfTables: 1,
            NumberOfSeats: parseInt(numberOfSeats),
            CustomerID: 1
          }),
        });

        // Handle response
        if (response.ok) {
          // const data = await response.json();

          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert("Success", "Reservation created successfully!");
          } else {
            // Fallback for web or Windows
            console.log("Success: Reservation created successfully!");
            alert("Success: Reservation created successfully!"); // Web/Windows alternative
          }
          console.log(1);
          // console.log(data); // Handle the response data if needed
        } else {
          console.log(2);
          Alert.alert("Error", "Failed to create reservation 01");
        }
      } catch (error) {
        console.log(3);
        Alert.alert("Error", "Failed to create reservation 02");
        console.error(error);
      } finally {
        console.log(4);
        setIsSubmitting(false);
      }
    }
    else {
      console.log('Form is invalid');
    }
  }


// Validation function
const validateForm = (): boolean => {
  let valid = true;
  const newErrors: Errors = { seats: false, timing: false, date: false };

  if (!numberOfSeats) {
    newErrors.seats = true;
    valid = false;
  }
  if (!timing) {
    newErrors.timing = true;
    valid = false;
  }
  // if (!date) {
  //   newErrors.date = true;
  //   valid = false;
  // }

  setErrors(newErrors);
  return valid;
};

// Function to reset fields
const handleFieldReset = () => {
  setNumberOfSeats(""); // Reset numberOfSeats to an empty string
  setTiming(""); // Reset timing to an empty string
  setDate(new Date()); // Reset date to current date
  setErrors({ seats: false, timing: false, date: false });
};



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
        <Select placeholder='Select one'
          {...commonDropdownStyles}
          selectedValue={numberOfSeats}
          onValueChange={handleSeatChange}
        >
          <Select.Item label="1" value="1" />
          <Select.Item label="2" value="2" />
          <Select.Item label="3" value="3" />
          <Select.Item label="4" value="4" />
          <Select.Item label="5" value="5" />
        </Select>
        {errors.seats && <Text color="red">Please select the number of seats.</Text>}
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Timing</Text>
        <Select placeholder='Select one'
          {...commonDropdownStyles}
          selectedValue={timing}
          onValueChange={handleTimingChange}
        >
          <Select.Item label="Breakfast" value="Breakfast" />
          <Select.Item label="Lunch" value="Lunch" />
          <Select.Item label="Dinner" value="Dinner" />
        </Select>
        {errors.timing && <Text color="red">Please select a timing.</Text>}
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Date</Text>
        {Platform.OS === 'web' ? (
            <DatePicker
              // showIcon
              selected={date}
              onChange={handleWebDateChange}
              // dateFormat="dd/MM/yyyy"
              className="react-datepicker-wrapper"
              customInput={<input style={customInputStyles} />}
            // style={styles.input}
            />
          ) : (
          <DateTimePicker onChange={onChangeDate} currentDate={date} />
        )}
        {/* {errors.date && <Text color="red">Please select a date.</Text>} */}

        <VStack gap={20} flex={1} justifyContent='flex-start' alignItems='flex-end'>
          <Button onPress={handleFieldReset}>Reset Fields</Button>
        </VStack>
      </VStack>

      <Button
        mt={"auto"}
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onPress={handleSubmit}
      >
        Book Reservation
      </Button>

    </VStack>
  );
};


const commonDropdownStyles = {
  height: 45,
  fontSize: "md", // for NativeBase font size
  backgroundColor: "#f9f9f9",
  borderColor: "#000",
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
