import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { View } from "react-native";
import moment from "moment";
import { getBikesByDates } from "../actions/bikeByDatesActions";
import { BIKES_BY_DATES_REDUCER_OPTIONS } from "../reducers/bikesByDatesReducer";
import { SELECTED_TIMESTAMPS_REDUCER_OPTIONS } from "../reducers/selectedTimestamps";
import Colors from "../constants/Colors";

function DateSelector(): JSX.Element {
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const dispatch = useDispatch();
  const { selectedTimestamps } = useSelector(
    (state: { selectedTimestamps: ITimestamps }) => state
  );
  const applyDatesFilter = (): void => {
    dispatch(getBikesByDates(selectedTimestamps));
  };

  const clearDatesFilter = (): void => {
    dispatch({
      type: BIKES_BY_DATES_REDUCER_OPTIONS.SET_BIKES_BY_DATES,
      payload: null,
    });
    dispatch({
      type: SELECTED_TIMESTAMPS_REDUCER_OPTIONS.RESET_TIMESTAMPS,
    });
  };

  return (
    <StyledDateSelector>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StyledDatesContainer onPress={() => setOpenStart(true)}>
          <StyledDatesTitle>Start:</StyledDatesTitle>
          <StyledDates>
            {moment(selectedTimestamps.start).format("DD-MM-YY HH:mm")}
          </StyledDates>
        </StyledDatesContainer>
        <DateTimePickerModal
          date={new Date(selectedTimestamps.start)}
          isVisible={openStart}
          onConfirm={(date) => {
            setOpenStart(false);
            dispatch({
              type: SELECTED_TIMESTAMPS_REDUCER_OPTIONS.SET_SELECTED_START,
              payload: (date as Date).getTime(),
            });
          }}
          onCancel={() => setOpenStart(false)}
        />
        <StyledDatesContainer onPress={() => setOpenEnd(true)}>
          <StyledDatesTitle>End:</StyledDatesTitle>
          <StyledDates>
            {moment(selectedTimestamps.end).format("DD-MM-YY HH:mm")}
          </StyledDates>
        </StyledDatesContainer>
        <DateTimePickerModal
          date={new Date(selectedTimestamps.end)}
          isVisible={openEnd}
          onConfirm={(date) => {
            setOpenEnd(false);
            dispatch({
              type: SELECTED_TIMESTAMPS_REDUCER_OPTIONS.SET_SELECTED_END,
              payload: (date as Date).getTime(),
            });
          }}
          onCancel={() => setOpenEnd(false)}
        />
      </View>
      <StyledButtonsContainer>
        <StyledFilterSubmit onPress={applyDatesFilter}>
          Check Availability
        </StyledFilterSubmit>
        <StyledFilterCancel onPress={clearDatesFilter}>
          Clear date filter
        </StyledFilterCancel>
      </StyledButtonsContainer>
    </StyledDateSelector>
  );
}

export default DateSelector;

const StyledDateSelector = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
`;
const StyledDatesContainer = styled.Pressable`
  display: flex;
  /* flex-direction: row; */
  margin-bottom: 30px;
  font-size: 18px;
  border: 1px solid ${Colors.light["dark-gray"]};
  border-radius: 5px;
  padding: 10px;
  width: 48%;
`;
const StyledButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-between;
`;
const StyledDatesTitle = styled.Text`
  color: ${Colors.light.black};
  margin-right: 5px;
  font-weight: 600;
`;
const StyledDates = styled.Text`
  color: ${Colors.light["dark-gray"]};
  font-size: 16px;
  border: none;
`;
const StyledFilterSubmit = styled.Text`
  border: none;
  background: ${Colors.light["dark-blue"]};
  padding: 10px;
  margin-right: 10px;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  width: 48%;
  text-align: center;
`;
const StyledFilterCancel = styled.Text`
  border: none;
  background: transparent;
  color: ${Colors.light["dark-blue"]};
  font-size: 15px;
  width: 48%;
  text-align: center;
`;
