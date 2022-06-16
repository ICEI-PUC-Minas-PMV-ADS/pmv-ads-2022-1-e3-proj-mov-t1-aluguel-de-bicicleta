import React, { useState, useEffect } from 'react';
import styled from "styled-components/native";
import { RootStackScreenProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from '../../common/pageHeader';
import { FAB, List } from 'react-native-paper';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { fetchUserReservations } from "../../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Perfil({ navigation }: RootStackScreenProps<"Perfil">): JSX.Element {

  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const [user, setUser] = useState(loggedUser?.result);
  const [userReservations, setUserReservations] = useState<IReservation[]>([]);

  const handleGoToEditProfile = () => {
    navigation.navigate("EditProfile");
  };
  
  useEffect(() => {
    setUser(user);

    if (user && user._id) {
      fetchUserReservations(user._id).then((response) => {
        console.log(response.data);
        let data = response.data.filter(
          x => new Date().getDate() >= new Date(x.startTimestamp).getDate()
            && new Date().getDate() <= new Date(x.endTimestamp).getDate()
        );
        setUserReservations(data);
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
          `From: ${new Date(item.startTimestamp).toLocaleString('pt-br')}\n` +
          `To: ${new Date(item.endTimestamp).toLocaleString('pt-br')}`
        }
        left={(props) => (
          <List.Icon
            {...props}
            color="#f4bd5a"
            icon="bike"
          />
        )}
      />
    </>
  );

  return (
    <StyledSelectedUser>

      <PageHeader pageName="My Profile" navigation={navigation} />

      <StyledUserName>{user.firstName} {user.lastName}</StyledUserName>

      <StyledStrong>email</StyledStrong>
      <StyledUserProp>{user.email}</StyledUserProp>

      <StyledStrong>manager</StyledStrong>
      <StyledUserProp>{user.isManager ? 'Yes' : 'No'}</StyledUserProp>

      <BookingsTitleContainer>
        <MaterialCommunityIcons name="calendar-check" size={18} color="#457B9D" />
        <StyledStrong> Current Bookings</StyledStrong>
      </BookingsTitleContainer>

      <FlatList
        data={userReservations}
        renderItem={renderItem}
        keyExtractor={(reservation) => reservation._id}
      />

      <FAB
        style={styles.fab}
        icon="pencil"
        onPress={handleGoToEditProfile}
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
    position: 'absolute',
    margin: 16,
    left: 10,
    bottom: 10,
    backgroundColor: "white",
  },
});

