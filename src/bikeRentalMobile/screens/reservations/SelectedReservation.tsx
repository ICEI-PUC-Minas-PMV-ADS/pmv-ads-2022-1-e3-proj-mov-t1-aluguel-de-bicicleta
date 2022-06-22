import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import {
  deleteReservation,
  getReservation,
} from "../../actions/reservationActions";
import ConfirmationDialog from "../../common/confirmationDialog";
import PageHeader from "../../common/pageHeader";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";

function SelectedReservation({
  navigation,
  route,
}: RootStackScreenProps<"SelectedReservation">): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const { selectedReservation } = useSelector(
    (state: {
      selectedReservation: IReservation;
      selectedTimestamps: ITimestamps;
    }) => state
  );
  const params = route.params as { reservationId: string };
  const dispatch = useDispatch();
  useFocusEffect(() => {
    if (params.reservationId) {
      dispatch(getReservation(params.reservationId));
    }
  });

  function handleCancelation(): void {
    dispatch(deleteReservation(selectedReservation));
    navigation.navigate("HomeScreen");
    setShowModal(false);
  }

  return selectedReservation ? (
    <StyledSelectedReservation>
      <PageHeader
        pageName={selectedReservation.bikeInfo.model}
        navigation={navigation}
      />
      <StyledReservationInfo>
        <StyledBikeInfoTitle>Location: </StyledBikeInfoTitle>
        <Text>{selectedReservation.bikeInfo.location}</Text>
      </StyledReservationInfo>
      <StyledReservationInfo>
        <StyledBikeInfoTitle>From: </StyledBikeInfoTitle>
        <Text>
          {new Date(selectedReservation.startTimestamp).toLocaleString()}
        </Text>
      </StyledReservationInfo>
      <StyledReservationInfo>
        <StyledBikeInfoTitle>To: </StyledBikeInfoTitle>
        <Text>
          {new Date(selectedReservation.endTimestamp).toLocaleString()}
        </Text>
      </StyledReservationInfo>
      <StyledCancelButton onPress={() => setShowModal(true)}>
        <StyledBookText>Cancel Reservation</StyledBookText>
      </StyledCancelButton>
      {showModal ? (
        <ConfirmationDialog
          onCancel={() => setShowModal(false)}
          onDelete={() => handleCancelation()}
          text="cancel"
        />
      ) : null}
    </StyledSelectedReservation>
  ) : (
    <View />
  );
}

export default SelectedReservation;

const StyledSelectedReservation = styled.View`
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

const StyledReservationInfo = styled.View`
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
`;

const StyledCancelButton = styled.Pressable`
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
`;
const StyledBookText = styled.Text`
  color: white;
  text-transform: uppercase;
`;
