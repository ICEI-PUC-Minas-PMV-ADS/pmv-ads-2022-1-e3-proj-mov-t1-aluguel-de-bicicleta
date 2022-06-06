import React, { useState } from "react";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import PageHeader from "../../common/pageHeader";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledInput, StyledLabel } from "../../common/styled";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createBike } from "../../actions/bikeActions";

function AddBike({ navigation }: RootStackScreenProps<"AddBike">): JSX.Element {
  const dispatch = useDispatch(); // hook for to call action

  const [newBike, setNewBike] = useState<PostBike>({} as PostBike);

  const existEmptiesFields = (): boolean =>
    (newBike && !newBike.model) || !newBike.color || !newBike.location;

  const onSaveBike = () => {
    if (existEmptiesFields()) {
      //TODO: falta mostrar mensagem pro usuario caso algum campo esteja vazio e ele clique em salvar bike.
      console.error(
        "Algum campo no formulário de Add bike não foi preenchido pelo usuário."
      );
    } else {
      console.warn(`Adding new bike.... ${JSON.stringify(newBike)}`);
      newBike.isAvailable = true;
      dispatch(createBike(newBike));
      navigation.goBack();//TODO: devemos chamar o navigator chamando a nova tela de listagem das bikes? Ainda não existe.
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

        <View style={styles.containerButtons}>
          <OptionListButton onPress={onSaveBike}>
            <ButtonText>Save</ButtonText>
            <MaterialIcons size={30} name="save" color="white" />
          </OptionListButton>

          <OptionListButton
            style={{ backgroundColor: "gray" }}
            onPress={() => navigation.goBack()}
          >
            <ButtonText>Cancel</ButtonText>
          </OptionListButton>
        </View>
      </View>
    </SafeAreaView>
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

const OptionListButton = styled.Pressable`
  width: 175px;
  padding: 10px;
  background: ${Colors.light.yellow};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
