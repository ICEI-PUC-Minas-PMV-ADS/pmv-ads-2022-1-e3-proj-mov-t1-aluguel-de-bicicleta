import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { RootStackScreenProps } from "../../types";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import { List } from "react-native-paper";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { fetchUserReservations } from "../../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Perfil({ navigation }: RootStackScreenProps<"Perfil">): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const [user, setUser] = useState(loggedUser?.result);
  const [userReservations, setUserReservations] = useState<IReservation[]>([]);

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
        description={
          `Location: ${item.bikeInfo.location}\n` +
          `From: ${new Date(item.startTimestamp).toLocaleString("pt-br")}\n` +
          `To: ${new Date(item.endTimestamp).toLocaleString("pt-br")}`
        }
        left={(props) => <List.Icon {...props} color="#f4bd5a" icon="bike" />}
      />
    </>
  );

  return (
    <StyledSelectedUser>
      <PageHeader
        pageName="My Reservations
      "
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
    </StyledSelectedUser>
  );
}

export default Perfil;

const StyledSelectedUser = styled.View`
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
});