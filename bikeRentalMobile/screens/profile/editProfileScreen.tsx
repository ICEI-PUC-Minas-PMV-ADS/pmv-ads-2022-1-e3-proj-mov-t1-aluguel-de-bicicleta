import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StyledInput, StyledLabel } from "../../common/styled";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";

import { FAB, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PageHeader from "../../common/pageHeader";
import { deleteUser } from "../../actions/userActions";



//TODO:
  /* precisa descriptografar a senha pra nao ficar
  ** gigante e o usuario achar estranho o tamanho de caracteres
  */
export default function EditProfileScreen() {
  const navigator = useNavigation();

  //Using Redux for to recovery user
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  const dispatch = useDispatch();

  useEffect(()=> {
    setUser(loggedUser?.result);
  }, [loggedUser]);
  
  const [user, setUser] = useState(loggedUser?.result);
  const [showPassword, setShowPassword] = useState(false);
  const [isManager, setIsManager] = useState(loggedUser?.result?.isManager || false);

  //TODO: falta chamar o redux para atualizar os dados do usuario logado.
  const handleUpdateUser = () => {
    const userUpdated = { ...user, isManager: isManager };
    console.debug(`Data updated user ${JSON.stringify(userUpdated)}`);
    return navigator.goBack();
  };

  const handleDeleteProfile = () => {
    console.log(`Deletando profile... ${JSON.stringify(loggedUser?.result)}`);
    dispatch(deleteUser(user))
    navigator.navigate("Login");
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageHeader pageName="Edit Profile" navigation={navigator} />

      <View style={{ flex: 1 }}>
        <View style={styles.input}>
          <StyledLabel>First Name</StyledLabel>
          <StyledInput
            textContentType="name"
            value={user?.firstName}
            onChangeText={(value) => setUser({...user, firstName: value})}
          />

          <StyledLabel>Last Name</StyledLabel>
          <StyledInput
            textContentType="name"
            value={user?.lastName}
            onChangeText={(value) => setUser({...user, lastName: value})}
          />

          <StyledLabel>Email</StyledLabel>
          <StyledInput
            textContentType="emailAddress"
            value={user?.email}
            onChangeText={(value) => setUser({...user, email: value})}
          />

          <StyledLabel>Password</StyledLabel>
          <StyledInput
            textContentType="password"
            secureTextEntry={!showPassword}
            value={user?.password}
            onChangeText={(value) => setUser({...user, password: value})}
          />

          <View>
            <StyledLabel>Is Manager?</StyledLabel>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Yes</Text>
              <RadioButton
                color={Colors.light.yellow}
                value="yes"
                status={isManager ? "checked" : "unchecked"}
                onPress={() => setIsManager(!isManager)}
              />
              <Text>No</Text>
              <RadioButton
                color={Colors.light.yellow}
                value="no"
                status={!isManager ? "checked" : "unchecked"}
                onPress={() => setIsManager(!isManager)}
              />
            </View>
          </View>
        </View>

        <View style={styles.containerButtons}>
          <OptionListButton onPress={handleUpdateUser}>
            <ButtonText>Save</ButtonText>
          </OptionListButton>
          <OptionListButton
            style={{ backgroundColor: "gray" }}
            onPress={() => navigator.goBack()}
          >
            <ButtonText>Back</ButtonText>
          </OptionListButton>
        </View>
      </View>

      {<FAB
        style={styles.fabDelete}
        icon="delete"
        onPress={handleDeleteProfile}
      />}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 8,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },  
  fabDelete: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
    backgroundColor: "white",
  }
});

const OptionListButton = styled.Pressable`
  width: 150px;
  font-weight: bold;
  padding: 10px;
  background: ${Colors.light.yellow};
  border-radius: 8px;
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: center; */
  align-items: center;
  margin: 8px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

