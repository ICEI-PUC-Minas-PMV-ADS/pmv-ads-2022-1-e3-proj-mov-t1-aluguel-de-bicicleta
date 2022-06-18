import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { StyledInput, StyledLabel, SubmitPressable } from "../../common/styled";
import PageHeader from "../../common/pageHeader";
import { RootStackScreenProps } from "../../types";
import { createBike, updateBike } from "../../actions/bikeActions";
import { defaultPadding } from "../../constants/Layout";

function AddBike({
  navigation,
  route,
}: RootStackScreenProps<"AddBike">): JSX.Element {
  const dispatch = useDispatch(); // hook for to call action
  const editedBike: IBike = route.params?.asset || ({} as IBike);

  const [newBike, setNewBike] = useState<PostBike>(editedBike);

  const existEmptiesFields = (): boolean =>
    (newBike && !newBike.model) || !newBike.color || !newBike.location;

  const onSaveBike = () => {
    if (existEmptiesFields()) {
      // TODO: falta mostrar mensagem pro usuario caso algum campo esteja vazio e ele clique em salvar bike.
      console.error(
        "Algum campo no formulário de Add bike não foi preenchido pelo usuário."
      );
    } else {
      console.warn(`Adding new bike.... ${JSON.stringify(newBike)}`);
      newBike.isAvailable = true;
      dispatch(createBike(newBike));
    }
    if (editedBike._id) {
      dispatch(updateBike(editedBike._id, newBike));
    } else {
      dispatch(createBike(newBike));
    }
    navigation.goBack(); // TODO: devemos chamar o navigator chamando a nova tela de listagem das bikes? Ainda não existe.
  };

  return (
    <StyledAddBike>
      <PageHeader pageName="New Bike" navigation={navigation} />

      <View style={{ flex: 1 }}>
        <View style={styles.input}>
          <StyledLabel>Model</StyledLabel>
          <StyledInput
            textContentType="name"
            value={newBike.model}
            onChangeText={(value) => setNewBike({ ...newBike, model: value })}
          />

          <StyledLabel>Color</StyledLabel>
          <StyledInput
            textContentType="name"
            value={newBike.color}
            onChangeText={(value) => setNewBike({ ...newBike, color: value })}
          />

          <StyledLabel>Location</StyledLabel>
          <StyledInput
            textContentType="emailAddress"
            value={newBike.location}
            onChangeText={(value) =>
              setNewBike({ ...newBike, location: value })
            }
          />
        </View>

        <SubmitPressable onPress={onSaveBike}>
          <ButtonText>Save</ButtonText>
          <MaterialIcons size={30} name="save" color="white" />
        </SubmitPressable>
      </View>
    </StyledAddBike>
  );
}

export default AddBike;

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const StyledAddBike = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  padding: ${defaultPadding}px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
