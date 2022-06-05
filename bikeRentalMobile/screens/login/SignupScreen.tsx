import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import PageHeader from "../../common/pageHeader";
import { StyledLabel, StyledInput } from "../../common/styled";
import Colors from "../../constants/Colors";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/userActions";

function SignupScreen({ navigation }): JSX.Element {
  const isFlowLogin = false;

  const dispatch = useDispatch(); // hook for to call action

  //Hook do estado para o objeto do novo usuario
  const [newUser, setNewUser] = useState<ISignupParams>({} as ISignupParams);

  const handleRegisterUser = () => {
    console.log(`Cadastrando usuario... ${JSON.stringify(newUser)}`);
    //dispatch(createUser(newUser, navigation, isFlowLogin));
  }

  //TODO: criar a montagem da tela
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageHeader pageName="New User" navigation={navigation} />

      <View style={{ flex: 1 }}>
        <View style={styles.input}>
          <StyledLabel>FirstName</StyledLabel>
          <StyledInput
            textContentType="name"
            value={newUser?.firstName}
            onChangeText={(value) =>
              setNewUser({ ...newUser, firstName: value })
            }
          />
        </View>

        <View style={styles.containerButtons}>
          <OptionListButton onPress={handleRegisterUser}>
            <ButtonText>Register</ButtonText>
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

export default SignupScreen;

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

/*
const StyledSignupLink = styled.Text.attrs(() => ({
  contentContainerStyle: {
    alignItems: "center",
  },
}))`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  width: 100%;
  height: 100%;
`;

const MiniBanner = styled.View`
  padding-top: 5%;
  width: 100%;
  height: 200px;
  min-height: 25%;
  background-color: #f7d08a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledUserNotFound = styled.Text`
  color: ${Colors.light.red};
  margin-top: 40px;
  align-self: center;
`;

const StyledLogin = styled.KeyboardAvoidingView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: #f7d08a;
`;
*/
