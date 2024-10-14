import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Select, CheckIcon } from 'native-base';
import { Reservation } from "@/types/reservation";

export default function TicketScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<string>('showAll');
  const [error, setError] = useState<string | null>(null);

  // Format Date for Display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://192.168.56.1:7248/Reservations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Reservation[] = await response.json();
        const transformedData = data.map((res: any) => ({
          reservationDate: formatDate(res.ReservationDate),
          timing: res.Timing,
          numberOfSeats: res.NumberOfSeats,
          id: res.ReservationID, // Ensure this matches your data structure
        }));
        setReservations(transformedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const isUpcoming = (reservationDate: string) => {
    const today = new Date();
    const reservationDateObj = new Date(reservationDate);
    return reservationDateObj > today;
  };

  const isComplete = (reservationDate: string) => {
    const today = new Date();
    const reservationDateObj = new Date(reservationDate);
    return reservationDateObj <= today;
  };

  const filteredReservations = reservations.filter((reservation) => {
    switch (filter) {
      case 'upcoming':
        return isUpcoming(reservation.reservationDate);
      case 'complete':
        return isComplete(reservation.reservationDate);
      case 'showAll':
        return true;
      default:
        return true;
    }
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <VStack flex={1} p={20} pb={0} gap={20}>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize={18} bold>{reservations.length} Reservations</Text>

        <Select
          selectedValue={filter}
          minWidth="200"
          accessibilityLabel="Select Filter"
          placeholder="Select Filter"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
          }}
          onValueChange={(itemValue) => setFilter(itemValue)}
          mt={1}
        >
          <Select.Item label="Show All" value="showAll" />
          <Select.Item label="Upcoming" value="upcoming" />
          <Select.Item label="Complete" value="complete" />
        </Select>
      </HStack>

      <View style={styles.container}>
        <FlatList
          data={filteredReservations}
          keyExtractor={(item) => item.id.toString()} // Ensure 'id' is unique
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>Date: {item.reservationDate}</Text>
              <Text style={styles.text}>Timing: {item.timing}</Text>
              <Text style={styles.text}>Number of Seats: {item.numberOfSeats}</Text>
            </View>
          )}
        />
      </View>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});
