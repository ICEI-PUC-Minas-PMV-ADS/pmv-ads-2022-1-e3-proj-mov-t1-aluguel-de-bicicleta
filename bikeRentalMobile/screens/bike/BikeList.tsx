import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { List } from "react-native-paper";
import { StyleSheet, FlatList, ListRenderItem, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import { deleteBike, fetchBikes } from "../../services/api";

function BikeList({
  navigation,
}: RootStackScreenProps<"BikeList">): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  const [bikes, setBikes] = useState<IBike[]>([]);
  const dispatch = useDispatch();

  const handleDeleteBike = (item: IBike) => {
    console.log(`Deletando bike... ${JSON.stringify(item)}`);
    dispatch(deleteBike(item._id));
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    fetchBikes().then((response) => {
      setBikes(response.data);
    });
  }, [loggedUser]);

  const renderItem: ListRenderItem<IBike> = ({ item }) => (
    <List.Item
      style={styles.listContainer}
      title={item.model}
      descriptionNumberOfLines={3}
      onPress={() => navigation.navigate("SelectedBike", { bikeId: item._id })}
      description={
        `Location: ${item.location}\n` +
        `Bike Available: ${item.isAvailable ? "Yes" : "No"}\n`
      }
      right={() => <StyledAvg>{item.rateAverage || "-"}</StyledAvg>}
    />
  );

  return (
    <StyledSelectedBike>
      <PageHeader pageName="All Bikes" navigation={navigation} />

      <BookingsTitleContainer>
        <MaterialCommunityIcons
          name="calendar-check"
          size={18}
          color="#457B9D"
        />
        <StyledStrong> All Bikes</StyledStrong>
      </BookingsTitleContainer>
      <FlatList
        data={bikes}
        renderItem={renderItem}
        keyExtractor={(bike) => bike._id}
      />

      <View style={styles.containerButtons}>
        <OptionListButton
          style={{ elevation: 10 }}
          onPress={() => navigation.navigate("AddBike")}
        >
          <ButtonText>New Bike</ButtonText>
        </OptionListButton>
        <OptionListButton
          style={{ elevation: 10 }}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <ButtonText>Home</ButtonText>
        </OptionListButton>
      </View>
    </StyledSelectedBike>
  );
}

export default BikeList;

const StyledAvg = styled.Text`
  color: green;
  font-size: 22px;
`;

const StyledSelectedBike = styled.View`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  background-color: white;
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
