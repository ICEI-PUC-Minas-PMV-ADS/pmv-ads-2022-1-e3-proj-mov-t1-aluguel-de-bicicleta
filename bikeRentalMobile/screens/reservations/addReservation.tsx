import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import PageHeader from "../../common/pageHeader";
import { Button, SafeAreaView, ListRenderItem, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { StyledInput, StyledLabel, SubmitPressable, SubmitPressableText } from "../../common/styled";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createReservation } from "../../services/api";
import { TextInput, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { black } from "react-native-paper/lib/typescript/styles/colors";
import { getBikes } from "../../actions/bikeActions";
import { defaultPadding } from "../../constants/Layout";
import ErrorDialog from "../../common/errorDialog";



function AddReservation({ navigation, }: RootStackScreenProps<"AddReservation">): JSX.Element {

  const dispatch = useDispatch(); // hook for to call action
  const [newReservation, setNewReservation] = useState<PostReservation>(
    {} as PostReservation
  );

  const [showCalendarStartTime, setShowCalendarStartTime] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // const [data, setData] = useState(moment(new Date()).format("DD/MM/YYYY"));
  // const [time, setTime] = useState(false);
  // const [date, setDate] = useState(new Date());
  // const [allBikes] = useState<IBike[]>([]);



  const renderBikes: ListRenderItem<IBike> = ({ item }) => (
    <>
      <List.Item
        style={styles.listContainer}
        title={`${item.model} - ${item.color.toLocaleUpperCase}`}
        descriptionNumberOfLines={3}
        description={
          `Location: ${item.location}\n` +
          `Bike Available: ${item.isAvailable ? "Yes" : "No"}\n`
        }
        onPress={() =>
          setNewReservation({ ...newReservation, bikeId: item._id })
        }
        left={(props: JSX.IntrinsicAttributes) => <List.Icon {...props} color="#f4bd5a" icon="bike" />}
      />
    </>
  );

  const existEmptiesFields = (): boolean =>
    (newReservation && !newReservation.bikeId) ||
    !newReservation.startTimestamp ||
    !newReservation.endTimestamp;

  const handleReservation = () => {
    if (existEmptiesFields()) {
      console.log(
        "Algum campo no formulário de Add bike não foi preenchido pelo usuário."
      )
      setShowDialog(true);
    } else {
      console.warn(`Adding new reservation....`);
      dispatch(createReservation(newReservation));
      navigation.navigate("ReservationList");
    }
  };

  {
    showDialog ? (
      <ErrorDialog
        onCancel={() => setShowDialog(false)}
        text="reservation" />
    ) : null
  }



  return (

    <SafeAreaView style={{ flex: 1 }}>

      <StyledCreateReservation behavior="padding">
        <PageHeader pageName="Create Reservation" navigation={navigation} />
        <SafeAreaView style={styles.input}>
          <StyledLabel>Bike ID:</StyledLabel>
          <StyledInput
            textContentType="name"
            value={newReservation.bikeId}
            onChangeText={(value) =>
              setNewReservation({ ...newReservation, bikeId: value })
            }
          />
        </SafeAreaView>

        {showCalendarStartTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={(new Date(newReservation.startTimestamp))}
            mode={"date"}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShowCalendarStartTime(false)}
            onChange={(event: any, value: number) => {
              setShowCalendarStartTime(false);
              //setData(moment(date).format('DD/MM/YYYY'));
              //setNewReservation({ ... newReservation, startTimeStamp: Date.parse(value)});
              setNewReservation({ ...newReservation, startTimestamp: value });
            }}
          />)}

        <SafeAreaView style={styles.input}>

          <TouchableOpacity onPress={() => setShowCalendarStartTime(true)}>
            <TextInput
              label="Date"
              value={newReservation.startTimestamp}
              left={<TextInput.Icon name="calendar" />}
              editable={false}
            />
          </TouchableOpacity>

          <SubmitPressable onPress={handleReservation}>
            <SubmitPressableText>Save Reservation</SubmitPressableText>
            <MaterialIcons size={30} name="check-box" color="white" />
          </SubmitPressable>
        </SafeAreaView>

      </StyledCreateReservation>
    </SafeAreaView>
  );


}

export default AddReservation;


const StyledCreateReservation = styled.KeyboardAvoidingView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: #f7d08a;
`;

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

//const styles = StyleSheet.create({
  // pageHeaderX: {
  //   padding: 10,
  // },
  // containerButtons: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  // containerInputs: {
  //   flex: 0.25,
  //   borderRadius: 10,
  // },
  // inputBox: {
  //   flex: 1,
  //   borderRadius: 20,
  //   margin: 10,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   paddingBottom: 60,
  //   justifyContent: "center",
  // },
  // sombraChique: {
  //   elevation: 10,
  // },
  // listContainer: {
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   margin: 5,
  //   elevation: 5,
  // },
//});



