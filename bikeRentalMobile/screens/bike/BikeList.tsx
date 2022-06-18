import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { List } from "react-native-paper";
import { StyleSheet, FlatList, ListRenderItem, View } from "react-native";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import { getBikes, setBikeRatingFilter } from "../../actions/bikeActions";
import { checkIfFilterMatchesBike } from "../../common/utils";
import DateSelector from "../../common/dateSelector";

function BikeList({
  navigation,
}: RootStackScreenProps<"BikeList">): JSX.Element {
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  const { bikes, bikesByDates } = useSelector(
    (state: { bikes: IBike[]; bikesByDates: IBike[] }) => state
  );
  const { bikeRating } = useSelector(
    (state: { searchFilters: ISearchFilters }) => state.searchFilters
  );

  const { isManager } = loggedUser.result;
  const bikesData = isManager ? bikesByDates || bikes : bikesByDates;
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState(bikesData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isManager) {
      dispatch(getBikes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = bikesData?.reduce(
      (acc: IBike[], bike: IBike) =>
        checkIfFilterMatchesBike(bike, filter) ? [...acc, bike] : acc,
      []
    );

    setFilteredList(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, bikes, bikesByDates, bikeRating]);

  useEffect(() => {
    const sessionValue = bikeRating || "0";
    if (sessionValue !== bikeRating?.toString()) {
      dispatch(setBikeRatingFilter(Number(sessionValue)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bikeRating]);

  const handleRatingFilterClick = (value: string): void => {
    dispatch(setBikeRatingFilter(Number(value)));
  };

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
      // eslint-disable-next-line react/no-unstable-nested-components
      right={() => <StyledAvg>{item.rateAverage || "-"}</StyledAvg>}
    />
  );

  return (
    <StyledSelectedBike>
      <PageHeader pageName="All Bikes" navigation={navigation} />
      <StyledFilterInput
        textContentType="name"
        value={filter}
        onChangeText={(value: string) => setFilter(value)}
      />
      <DateSelector />
      <FlatList
        data={filteredList}
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

export const StyledFilterInput = styled.TextInput`
  font-size: 20px;
  line-height: 22px;
  height: 60px;
  margin-top: 30px;
  margin-bottom: 20px;
  border: 1px solid ${Colors.light.gray};
  padding: 8px 25px;
  width: 100%;
  border-radius: 60px;
`;
