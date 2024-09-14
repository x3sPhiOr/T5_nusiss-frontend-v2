import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { ticketService } from "@/services/tickets";
import { Ticket } from "@/types/ticket";
import { useFocusEffect } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity, StyleSheet, View } from "react-native";
import { Select, CheckIcon } from 'native-base';
import { Reservation } from "@/types/reservation";

export default function TicketScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<string>('showAll');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reservations, setReservations] = useState<Reservation[]>([
  ]);
    // Example reservations data
  //   {
  //     id: 1,
  //     reservationDate: '2024-08-20T18:00:00Z',
  //     timing: 'dinner',
  //     numberOfSeats: 4,
  //   },
  //   {
  //     id: 2,
  //     reservationDate: '2024-09-21T12:00:00Z',
  //     timing: 'lunch',
  //     numberOfSeats: 2,
  //   },
  //   {
  //     id: 3,
  //     reservationDate: '2024-09-22T09:00:00Z',
  //     timing: 'breakfast',
  //     numberOfSeats: 6,
  //   },
  // ]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: "My Reservations" });
  }, []);


  useEffect(() => {
    fetch('https://192.168.56.1:7248/Reservations')
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Transform the API response to extract only the necessary fields
        console.log(data); 
        const transformedData = data.map((res: any) => ({
          reservationDate: res.ReservationDate,
          timing: res.Timing,
          numberOfSeats: res.NumberOfSeats,
          id: res.ReservationID, 
        }));
        setReservations(transformedData);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
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

  // Filter reservations based on the selected filter
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

  return (
    <VStack flex={1} p={20} pb={0} gap={20}>

      <HStack alignItems="center" justifyContent="space-between">
        <Text fontSize={18} bold>{filteredReservations.length} Reservations</Text>

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
          <Select.Item label="Completed" value="completed" />
        </Select>
      </HStack>

      <View style={styles.container}>



        <FlatList
          data={filteredReservations}
          keyExtractor={(item) => item.id.toString()} // Assuming 'id' is a unique identifier for each reservation
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>Date: {item.reservationDate}</Text>
              <Text style={styles.text}>Timing: {item.timing}</Text>
              <Text style={styles.text}>Number of Seats: {item.numberOfSeats}</Text>
            </View>
          )}
        />
      </View>
      );

      {/* <FlatList
        keyExtractor={({ id }) => id.toString()}
        data={tickets}
        onRefresh={fetchTickets}
        refreshing={isLoading}
        renderItem={({ item: ticket }) => (
          <TouchableOpacity disabled={ticket.entered} onPress={() => onGoToTicketPage(ticket.id)}>
            <VStack
              gap={20}
              h={120}
              key={ticket.id}
              style={{ opacity: ticket.entered ? 0.5 : 1 }}
            >
              <HStack>
                <VStack
                  h={120}
                  w={"69%"}
                  p={20}
                  justifyContent="space-between"
                  style={{
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5
                  }}
                >
                  <HStack alignItems="center">
                    <Text fontSize={22} bold>{ticket.event.name}</Text>
                    <Text fontSize={22} bold> | </Text>
                    <Text fontSize={16} bold>{ticket.event.location}</Text>
                    <Text style={styles.text}>Date: item.reservationDate</Text>
            <Text style={styles.text}>Timing: item.timing</Text>
            <Text style={styles.text}>Number of Seats: item.numberOfSeats</Text>
                  </HStack>
                  <Text fontSize={12}>{new Date(ticket.event.date).toLocaleString()}</Text>
                </VStack>

                <VStack
                  h={110}
                  w={"1%"}
                  style={{
                    alignSelf: "center",
                    borderColor: "lightgray",
                    borderWidth: 2,
                    borderStyle: 'dashed',
                  }}
                />

                <VStack
                  h={120}
                  w={"29%"}
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: "white",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                >
                  <Text fontSize={16} bold>{ticket.entered ? "Used" : "Available"}</Text>
                  {ticket.entered &&
                    <Text mt={12} fontSize={10}>{new Date(ticket.updatedAt).toLocaleString()}</Text>
                  }
                </VStack>
              </HStack>

            </VStack>
          </TouchableOpacity>
        )}

        ItemSeparatorComponent={() => <VStack h={20} />}
      /> */}

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

