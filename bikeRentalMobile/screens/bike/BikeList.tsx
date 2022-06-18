import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { List } from "react-native-paper";
import { StyleSheet, FlatList, ListRenderItem, Text, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { AntDesign } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../types";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from "../../common/pageHeader";
import { getBikes, setBikeRatingFilter } from "../../actions/bikeActions";
import { checkIfFilterMatchesBike } from "../../common/utils";
import DateSelector from "../../common/dateSelector";
import { StyledFilterInput } from "../../common/styled";

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

  const RATING_OPTIONS = [
    { key: "0", label: 0 },
    { key: "1", label: 1 },
    { key: "2", label: 2 },
    { key: "3", label: 3 },
    { key: "4", label: 4 },
    { key: "5", label: 5 },
  ];

  const renderItem: ListRenderItem<IBike> = ({ item }) => {
    if (item.rateAverage < bikeRating) return null;
    return (
      <List.Item
        style={styles.listContainer}
        title={item.model}
        descriptionNumberOfLines={3}
        onPress={() =>
          navigation.navigate("SelectedBike", { bikeId: item._id })
        }
        description={
          `Location: ${item.location}\n` +
          `Bike Available: ${item.isAvailable ? "Yes" : "No"}\n`
        }
        // eslint-disable-next-line react/no-unstable-nested-components
        right={() => <StyledAvg>{item.rateAverage || "-"}</StyledAvg>}
      />
    );
  };

  return (
    <StyledSelectedBike>
      <PageHeader
        pageName="All Bikes"
        navigation={navigation}
        addOption="AddBike"
      />
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <StyledFilterInput
          textContentType="name"
          value={filter}
          onChangeText={(value: string) => setFilter(value)}
        />
        <ModalSelector
          data={RATING_OPTIONS}
          initValue="Rating"
          onChange={(option) => {
            handleRatingFilterClick(option.key);
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 15 }}>Rating</Text>
            <Text style={{ fontSize: 25 }}>
              {bikeRating} &nbsp;
              <AntDesign name="caretdown" size={10} color="black" />
            </Text>
          </View>
        </ModalSelector>
      </View>
      <DateSelector />
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(bike) => bike._id}
      />
    </StyledSelectedBike>
  );
}

export default BikeList;

const StyledAvg = styled.Text`
  color: green;
  font-size: 22px;
`;

const StyledSelectedBike = styled.SafeAreaView`
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

