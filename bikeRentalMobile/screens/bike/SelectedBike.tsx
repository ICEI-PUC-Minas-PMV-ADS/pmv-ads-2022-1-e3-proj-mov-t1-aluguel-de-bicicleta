import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { defaultPadding } from "../../constants/Layout";
import { deleteBike, getBike } from "../../actions/bikeActions";
import { getBikesByDates } from "../../actions/bikeByDatesActions";
import { createReservation } from "../../actions/reservationActions";
// import { CardRating } from "../common/listCard";
// import SelectedAssetButtons from "../common/selectedAssetButtons";
import { rateBike } from "../../services/api";
import Colors from "../../constants/Colors";
import PageHeader from "../../common/pageHeader";
import { RATING_OPTIONS } from "../../reducers/searchFiltersReducer";
import { RootStackScreenProps } from "../../types";
import SelectedAssetButtons from "../../common/selectedAssetButtons";

function SelectedBike({
  navigation,
  route,
}: RootStackScreenProps<"SelectedBike">): JSX.Element {
  const { selectedBike, selectedTimestamps } = useSelector(
    (state: { selectedBike: IBike; selectedTimestamps: ITimestamps }) => state
  );
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const params = route.params as { bikeId: string };
  console.log(route);
  const dispatch = useDispatch();
  const userRating = selectedBike?.userRatingValue;

  useEffect(() => {
    dispatch(getBike(params.bikeId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (): void => {
    dispatch(deleteBike(selectedBike));
    navigation.navigate("BikeList");
  };

  const handleBikeBooking = (): void => {
    const reservationParams = {
      bikeId: selectedBike._id,
      startTimestamp: selectedTimestamps.start,
      endTimestamp: selectedTimestamps.end,
    };
    dispatch(createReservation(reservationParams, selectedBike, navigation));
  };

  const handleRatingClick = (
    event: React.MouseEvent<HTMLElement>,
    value: number
  ): void => {
    event.preventDefault();

    rateBike(selectedBike._id, value).then(() => {
      dispatch(getBike(params.bikeId));
      dispatch(getBikesByDates(selectedTimestamps));
    });
  };
  const { isManager } = loggedUser.result;

  return selectedBike ? (
    <StyledSelectedBike>
      <PageHeader pageName={selectedBike.model} navigation={navigation} />
      <SelectedAssetButtons onDelete={onDelete} navigation={navigation} />
      <StyledBikeInfo>
        <StyledBikeInfoTitle>Color: </StyledBikeInfoTitle>
        <Text>{selectedBike.color}</Text>
      </StyledBikeInfo>
      <StyledBikeInfo>
        <StyledBikeInfoTitle>Location: </StyledBikeInfoTitle>

        <Text>{selectedBike.location}</Text>
      </StyledBikeInfo>
      <StyledRatingsContainer>
        <Text>{isManager ? "Bike Rating" : "Rate Bike"}: </Text>
        {isManager ? null : (
          <StyledStarsContainer>
            {RATING_OPTIONS.map((ratingValue) => (
              <StyledRatingPressable
                isSelected={ratingValue <= userRating}
                onPress={(event) => handleRatingClick(event, ratingValue)}
                key={ratingValue}
              >
                <AntDesign
                  name={ratingValue <= userRating ? "star" : "staro"}
                  size={40}
                  color={
                    ratingValue <= userRating
                      ? Colors.light.yellow
                      : Colors.light.black
                  }
                />
              </StyledRatingPressable>
            ))}
          </StyledStarsContainer>
        )}
        {/* <CardRating
          className={`selectedBike--rating__value rating${Math.floor(
            selectedBike.rateAverage
          )}`}
        >
          {selectedBike.rateAverage}
        </CardRating> */}
      </StyledRatingsContainer>
      {isManager ? null : (
        <StyledBookingButton
          disabled={!selectedBike.isAvailable}
          onPress={handleBikeBooking}
        >
          <StyledBookText>
            {selectedBike.isAvailable ? "Book Bike" : "Bike Unavailable"}
          </StyledBookText>
        </StyledBookingButton>
      )}
    </StyledSelectedBike>
  ) : (
    <Text>Not found</Text>
  );
}

export default SelectedBike;

const StyledSelectedBike = styled.View`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  height: 100%;
`;

const StyledBikeInfoTitle = styled.Text`
  color: ${Colors.light["dark-blue"]};
  text-transform: uppercase;
`;
const StyledBookText = styled.Text`
  color: white;
  text-transform: uppercase;
`;

const StyledBikeInfo = styled.View`
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
`;

const StyledBookingButton = styled.Pressable`
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 17px;
  background: ${Colors.light.red};
  color: white;
  margin-top: 80px;
  text-transform: uppercase;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:disabled {
    color: black;
    background: ${Colors.light.gray};
    opacity: 0.6;
  }
`;

const StyledRatingsContainer = styled.View`
  position: relative;
`;

const StyledRatingPressable = styled.Pressable<{ isSelected: boolean }>`
  background: transparent;
  font-size: 30px;
  border: none;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.2)};
  color: ${({ isSelected }) =>
    isSelected ? Colors.light.yellow : Colors.light.black};
`;
const StyledStarsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
