import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { RootStackScreenProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import { List } from "react-native-paper";
import { StyleSheet, FlatList, ListRenderItem, View } from "react-native";
import { fetchUserReservations } from "../../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteReservation } from "../../actions/reservationActions";

function ReservationList({ navigation }: RootStackScreenProps<"ReservationList">): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const [user, setUser] = useState(loggedUser?.result);
  const [userReservations, setUserReservations] = useState<IReservation[]>([]);
  const dispatch = useDispatch();

  const handleDeleteReservation = (item: IReservation) => {

    console.log(`Deletando reserva... ${JSON.stringify(item)}`);
    dispatch(deleteReservation(item));
    navigation.navigate("ReservationList");
  }

  useEffect(() => {
    setUser(user);

    if (user && user._id) {
      fetchUserReservations(user._id).then((response) => {
        setUserReservations(response.data);
      });
    }
  }, [loggedUser]);

  const renderItem: ListRenderItem<IReservation> = ({ item }) => (
    <>
      <List.Item
        style={styles.listContainer}
        title={item.bikeInfo.model}
        descriptionNumberOfLines={3}
        onPress={() => handleDeleteReservation(item)}
        description={
          `Location: ${item.bikeInfo.location}\n` +
          `From: ${new Date(item.startTimestamp).toLocaleString("pt-br")}\n` +
          `To: ${new Date(item.endTimestamp).toLocaleString("pt-br")}`
        }
        right={(props) => <List.Icon {...props} color="#f4bd5a" icon="delete" />}

      />
    </>
  );

  return (
    <StyledSelectedReservation>
      <PageHeader
        pageName="My Reservations"
        navigation={navigation}
      />

      <BookingsTitleContainer>
        <MaterialCommunityIcons
          name="calendar-check"
          size={18}
          color="#457B9D"
        />
        <StyledStrong> Current Bookings</StyledStrong>
      </BookingsTitleContainer>
      <FlatList
        data={userReservations}
        renderItem={renderItem}
        keyExtractor={(reservation) => reservation._id}
      />


      <View style={styles.containerButtons}>
        <OptionListButton
          style={{ elevation: 10 }}
          onPress={() => navigation.navigate("AddReservation")}
        >
          <ButtonText>New Booking</ButtonText>
        </OptionListButton>
        <OptionListButton
          style={{ elevation: 10 }}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <ButtonText>Home</ButtonText>
        </OptionListButton>
      </View>


    </StyledSelectedReservation>
  );
}

export default ReservationList;

const StyledSelectedReservation = styled.View`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`;

const StyledStrong = styled.Text`
  color: ${Colors.dark["dark-blue"]};
  text-transform: uppercase;
  font-weight: bold;
`;

const BookingsTitleContainer = styled.View`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const OptionListButton = styled.Pressable`
  flex: 1;
  width: 175px;
  padding: 10px;
  background: ${Colors.light.yellow};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 9px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
  padding-right: 10px;
`;


// import React, { useState, useEffect } from "react";
// import styled from "styled-components/native";
// import { RootStackScreenProps } from "../../types";
// import { useSelector } from "react-redux";
// import Colors from "../../constants/Colors";
// import { defaultPadding } from "../../constants/Layout";
// import PageHeader from "../../common/pageHeader";
// import { List } from "react-native-paper";
// import { StyleSheet, FlatList, ListRenderItem, View } from "react-native";
// import { fetchUserReservations } from "../../services/api";
// import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// function ReservationList({ navigation }: RootStackScreenProps<"ReservationList">): JSX.Element {
//   const { loggedUser } = useSelector(
//     (state: { loggedUser: UserObject }) => state
//   );
//   const [user, setUser] = useState(loggedUser?.result);
//   const [userReservations, setUserReservations] = useState<IReservation[]>([]);

//   useEffect(() => {
//     setUser(user);

//     if (user && user._id) {
//       fetchUserReservations(user._id).then((response) => {
//         setUserReservations(response.data);
//       });
//     }
//   }, [loggedUser]);

//   const renderItem: ListRenderItem<IReservation> = ({ item }) => (
//     <>
//       <List.Item
//         style={styles.listContainer}
//         title={item.bikeInfo.model}
//         descriptionNumberOfLines={3}
//         description={
//           `Location: ${item.bikeInfo.location}\n` +
//           `From: ${new Date(item.startTimestamp).toLocaleString("pt-br")}\n` +
//           `To: ${new Date(item.endTimestamp).toLocaleString("pt-br")}`
//         }
//         left={(props) => <List.Icon {...props} color="#f4bd5a" icon="bike" />}
//       />
//     </>
//   );

//   return (
//     <StyledReservationsList behavior="padding">
//       <PageHeader
//         pageName="Reservations"
//         navigation={navigation}
//       />

//       <BookingsTitleContainer>
//         <MaterialCommunityIcons
//           name="calendar-check"
//           size={18}
//           color="#457B9D"
//         />
//         <StyledStrong> Current Bookings</StyledStrong>
//       </BookingsTitleContainer>
//       <FlatList
//         data={userReservations}
//         renderItem={renderItem}
//         keyExtractor={(reservation) => reservation._id}
//       />
//        <View style={styles.containerButtons}>
//           <OptionListButton
//             style={{ elevation: 10 }}
//             onPress={() => navigation.navigate("AddReservation")}
//           >
//           <ButtonText>New Booking</ButtonText>
//           </OptionListButton>
//           <OptionListButton
//             style={{ elevation: 10 }}
//             onPress={() => navigation.navigate("HomeScreen")}
//           >
//             <ButtonText>Home</ButtonText>
//           </OptionListButton>
//         </View>
//     </StyledReservationsList>

//   );
// }

// export default ReservationList;

// const StyledReservationsList = styled.View`
//   padding: ${defaultPadding}px;
//   display: flex;
//   flex-direction: column;
//   background-color: #f7d08a;
// `;

// const StyledStrong = styled.Text`
//   color: ${Colors.dark["dark-blue"]};
//   text-transform: uppercase;
//   font-weight: bold;
// `;

// const BookingsTitleContainer = styled.View`
//   width: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: row;
//   margin-top: 20px;
//   margin-bottom: 20px;
// `;



// const styles = StyleSheet.create({
//   listContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     margin: 5,
//     elevation: 5,
//   },
//   containerButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   containerInputs: {
//     flex: 0.25,
//     borderRadius: 10,
//   },
//   inputBox: {
//     flex: 1,
//     borderRadius: 20,
//     margin: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingBottom: 60,
//     justifyContent: "center",
//   },
//   sombraChique: {
//     elevation: 10,
//   },
// });