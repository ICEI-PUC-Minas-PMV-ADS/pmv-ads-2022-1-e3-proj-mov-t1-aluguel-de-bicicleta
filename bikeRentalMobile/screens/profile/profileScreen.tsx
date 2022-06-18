import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { FAB, List } from "react-native-paper";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import { fetchUserReservations } from "../../services/api";

function Perfil({
  navigation,
  route,
}: RootStackScreenProps<"Profile" | "SelectedUser">): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  const selectedUser = route?.params?.user;
  const user = selectedUser || loggedUser?.result;
  const [userReservations, setUserReservations] = useState<IReservation[]>([]);

  const handleGoToEditProfile = () => {
    navigation.navigate("EditProfile", { user });
  };

  useEffect(() => {
    if (user && user._id) {
      fetchUserReservations(user._id).then((response) => {
        // console.log(response.data);
        // let data = response.data.filter(
        //   x => new Date().getDate() >= x.startTimestamp
        //     && new Date().getDate() <= x.endTimestamp
        // );
        setUserReservations(response.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  const renderItem: ListRenderItem<IReservation> = ({ item }) => (
    <List.Item
      style={styles.listContainer}
      title={item.bikeInfo.model}
      descriptionNumberOfLines={3}
      description={
        `Location: ${item.bikeInfo.location}\n` +
        `From: ${new Date(item.startTimestamp).toLocaleString("pt-br")}\n` +
        `To: ${new Date(item.endTimestamp).toLocaleString("pt-br")}`
      }
      // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
      left={(props) => <List.Icon {...props} color="#f4bd5a" icon="bike" />}
    />
  );

  return (
    <StyledSelectedUser>
      <PageHeader
        pageName={selectedUser ? user.firstName : "My Profile"}
        navigation={navigation}
      />

      <StyledUserName>
        {user.firstName} {user.lastName}
      </StyledUserName>

      <StyledStrong>email</StyledStrong>
      <StyledUserProp>{user.email}</StyledUserProp>

      <StyledStrong>manager</StyledStrong>
      <StyledUserProp>{user.isManager ? "Yes" : "No"}</StyledUserProp>

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
      {loggedUser.result?.isManager ? (
        <FAB style={styles.fab} icon="pencil" onPress={handleGoToEditProfile} />
      ) : null}
    </StyledSelectedUser>
  );
}

export default Perfil;

const StyledSelectedUser = styled.SafeAreaView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  background-color: white;
`;

const StyledUserName = styled.Text`
  font-size: 20px;
  padding-top: ${defaultPadding}px;
  margin-bottom: 25px;
  color: ${Colors.dark["dark-blue"]};
`;

const StyledStrong = styled.Text`
  color: ${Colors.dark["dark-blue"]};
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledUserProp = styled.Text`
  color: ${Colors.dark.black};
  margin-bottom: 25px;
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
  fab: {
    position: "absolute",
    margin: 16,
    left: 10,
    bottom: 10,
    backgroundColor: "white",
  },
});
