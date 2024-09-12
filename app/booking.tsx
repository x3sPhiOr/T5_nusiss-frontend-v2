import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { VStack } from '@/components/VStack';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { globals } from '@/styles/_global';
// import DateTimePicker from '@/components/DateTimePicker';

const ReservationForm = () => {
  const [timing, setTiming] = useState('');
  const [numTables, setNumTables] = useState('');
  const [numSeats, setNumSeats] = useState('');

  const handleSubmit = () => {
    console.log({
      timing,
      numTables,
      numSeats,
    });
    // Add your API call logic here to submit the form
  };

  return (


    <View style={styles.container}>

<KeyboardAvoidingView behavior="padding" style={ globals.container }>
      <ScrollView contentContainerStyle={ globals.container }>
        <VStack flex={ 1 } justifyContent='center' alignItems='center' p={ 40 } gap={ 40 }>
          <VStack w={ "100%" } gap={ 30 }>
        {/* <VStack flex={ 1 } justifyContent='center' alignItems='center' p={ 40 } gap={ 40 }> */}
      <Text style={styles.label}>Timing</Text>
      <Picker
        selectedValue={timing}
        onValueChange={(itemValue) => setTiming(itemValue)}
        style={styles.picker}
      >
        {/* <DateTimePicker onChange={onChangeDate} currentDate={date}/> */}
        <Picker.Item label="Select a timing" value="" />
        <Picker.Item label="Breakfast" value="breakfast" />
        <Picker.Item label="Lunch" value="lunch" />
        <Picker.Item label="Dinner" value="dinner" />
      </Picker>

      <Text style={styles.label}>Number of Tables</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numTables}
        onChangeText={setNumTables}
      />

      <Text style={styles.label}>Number of Seats</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numSeats}
        onChangeText={setNumSeats}
      />

      <Button title="Submit" onPress={handleSubmit} />
      
      </VStack>
</VStack>
</ScrollView>
</KeyboardAvoidingView >

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default ReservationForm;
