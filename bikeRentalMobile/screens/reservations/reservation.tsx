import React, { useState } from "react";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import PageHeader from "../../common/pageHeader";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledInput, StyledLabel } from "../../common/styled";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createReservation } from "../../services/api";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
import Alert from "../../components/Alert";
import { now } from "lodash";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { black } from "react-native-paper/lib/typescript/styles/colors";

function AddReservations({
  navigation,
}: RootStackScreenProps<"AddReservations">): JSX.Element {
  const dispatch = useDispatch(); // hook for to call action

  const [newReservation, setNewReservation] = useState<PostReservation>(
    {} as PostReservation
  );
  const [show, setShow] = useState(false);
  const [data, setData] = useState(moment(new Date()).format("DD/MM/YYYY"));

  const existEmptiesFields = (): boolean =>
    (newReservation && !newReservation.bikeId) ||
    !newReservation.startTimestamp ||
    !newReservation.endTimestamp;

  const onSaveReservation = () => {
    if (existEmptiesFields()) {
      console.log(
        "Algum campo no formulário de Add bike não foi preenchido pelo usuário."
      );
    } else {
      console.warn(`Adding new reservation....`);
      dispatch(createReservation(newReservation));
      navigation.navigate("Root");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageHeader
        pageName="New Reservation"
        navigation={navigation}
        style={styles.pageHeaderX}
      />
      <View style={styles.inputBox}>
        <View style={styles.containerInputs}>
          <StyledLabel>Bike ID:</StyledLabel>
          <StyledInput
            style={styles.sombraChique}
            textContentType="name"
            value={newReservation.bikeId}
            onChangeText={(value) =>
              setNewReservation({ ...newReservation, bikeId: value })
            }
          />
        </View>
        <View style={styles.containerInputs}>
          <StyledLabel>To:</StyledLabel>
          <StyledInput
            style={styles.sombraChique}
            mode={"date"}
            value={16546404247}
            onPressIn={(value) =>
              setNewReservation({ ...newReservation, startTimestamp: value })
            }
          />
        </View>
        <View style={styles.containerInputs}>
          <StyledLabel>From:</StyledLabel>
          <StyledInput
            style={styles.sombraChique}
            mode={"date"}
            value={1654640424744}
            onPressIn={(value) =>
              setNewReservation({ ...newReservation, endTimestamp: value })
            }
          />
        </View>
        <View style={styles.containerButtons}>
          <OptionListButton
            onPress={onSaveReservation}
            style={{ elevation: 10 }}
          >
            <ButtonText>Save</ButtonText>
            <MaterialIcons size={25} name="save" color="white" />
          </OptionListButton>
          <OptionListButton
            style={{ backgroundColor: "gray", elevation: 10 }}
            onPress={() => navigation.goBack()}
          >
            <ButtonText>Cancel</ButtonText>
          </OptionListButton>
        </View>
      </View>

      {/* <DateTimePicker
            testID="dateTimePicker"
            value={newReservation.startTimestamp}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event: any, date: any) => {
              setShow(false);
              setData(moment(date).format('DD/MM/YYYY'));
             // setNewReservation({ ... newReservation, startTimeStamp: Date.parse(value)});
              //setNewReservation({...newReservation, startTimeStamp: Date.parse(moment(date).format('DD/MM/YYYY'))}),
            }}
          /> */}

      {/* <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data"
            value={data}
            left={<TextInput.Icon name="calendar" />}
            editable={false}
          />
        </TouchableOpacity> */}
    </SafeAreaView>
  );
}

export default AddReservations;

const styles = StyleSheet.create({
  pageHeaderX: {
    padding: 10,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerInputs: {
    flex: 0.25,
    borderRadius: 10,
  },
  inputBox: {
    flex: 1,
    borderRadius: 20,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60,
    justifyContent: "center",
  },
  sombraChique: {
    elevation: 10,
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
