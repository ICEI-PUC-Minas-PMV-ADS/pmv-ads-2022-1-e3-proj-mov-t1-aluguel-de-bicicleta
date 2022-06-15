import React, { useState } from "react";
import { RootStackScreenProps } from "../../types";
import PageHeader from "../../common/pageHeader";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StyledInput, StyledLabel, SubmitPressable, SubmitPressableText } from "../../common/styled";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createReservation } from "../../services/api";
import moment from "moment";
import { defaultPadding } from "../../constants/Layout";




function AddReservation({ navigation, }: RootStackScreenProps<"AddReservation">): JSX.Element {

  const dispatch = useDispatch(); // hook for to call action
  const [newReservation, setNewReservation] = useState<PostReservation>(
    {} as PostReservation
  );

  const existEmptiesFields = (): boolean =>
    (newReservation && !newReservation.bikeId) ||
    !newReservation.startTimestamp ||
    !newReservation.endTimestamp;

  const handleReservation = () => {
    if (existEmptiesFields()) {
      console.log(
        "Algum campo no formulário de Add bike não foi preenchido pelo usuário." + JSON.stringify(newReservation)
      )
    } else {
      console.log(`Adding new reservation....` + JSON.stringify(newReservation));
      dispatch(createReservation(newReservation));
      navigation.navigate("HomeScreen");
    }
  };

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


        <View>
          <StyledLabel>From:</StyledLabel>
          <StyledInput
            placeholder={(moment(new Date()).format('MM/DD/YYYY'))}
            onChangeText={(value) =>
              setNewReservation({ ...newReservation, startTimestamp: (new Date(value)).getTime() })
            }
          />
        </View>

        <View>
          <StyledLabel>To:</StyledLabel>
          <StyledInput
            placeholder={(moment(new Date()).format('MM/DD/YYYY'))}
            onChangeText={(value) =>
              setNewReservation({ ...newReservation, endTimestamp: (new Date(value)).getTime() })
            }
          />
        </View>


        <SubmitPressable style={{ marginTop: 150 }} onPress={handleReservation}>
          <SubmitPressableText>Save Reservation</SubmitPressableText>
          <MaterialIcons size={30} name="check-box" color="white" />
        </SubmitPressable>


      </StyledCreateReservation>
    </SafeAreaView>
  );


}

export default AddReservation;


const StyledCreateReservation = styled.KeyboardAvoidingView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  background-color: #f7d08a;
  width: 100%;
  height: 100%;
`;

const styles = StyleSheet.create({
  input: {
    margin: 15
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

