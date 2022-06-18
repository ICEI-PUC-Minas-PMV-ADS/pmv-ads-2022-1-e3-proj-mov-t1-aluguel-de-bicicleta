import React, { useState } from "react";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { List } from "react-native-paper";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackScreenProps } from "../../types";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import { fetchUserReservations } from "../../services/api";

function ReservationList({
  navigation,
}: RootStackScreenProps<"ReservationList">): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const user = loggedUser?.result;
  const [userReservations, setUserReservations] = useState<IReservation[]>([]);

  useFocusEffect(() => {
    if (user && user._id) {
      fetchUserReservations(user._id).then((response) => {
        setUserReservations(response.data);
      });
    }
  });

  const renderItem: ListRenderItem<IReservation> = ({ item }) => (
    <List.Item
      style={styles.listContainer}
      title={item.bikeInfo.model}
      descriptionNumberOfLines={3}
      onPress={() =>
        navigation.navigate("SelectedReservation", { reservationId: item._id })
      }
      description={
        `Location: ${item.bikeInfo.location}\n` +
        `From: ${new Date(item.startTimestamp).toLocaleString("pt-br")}\n` +
        `To: ${new Date(item.endTimestamp).toLocaleString("pt-br")}`
      }
    />
  );

  return (
    <StyledSelectedReservation>
      <PageHeader pageName="My Reservations" navigation={navigation} />
      <FlatList
        data={userReservations}
        renderItem={renderItem}
        keyExtractor={(reservation) => reservation._id}
      />
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
  background-color: white;
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
