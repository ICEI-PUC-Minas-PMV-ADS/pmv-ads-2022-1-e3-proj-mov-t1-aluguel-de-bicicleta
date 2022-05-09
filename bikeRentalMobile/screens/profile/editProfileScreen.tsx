import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StyledInput, StyledLabel } from "../../common/styled";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "../../services/loggedInServices";

import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  const selectedUser = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    isManager: false,
  };

  const [firstName, setFirstName] = useState(selectedUser?.firstName || ``);
  const [lastName, setLastName] = useState(selectedUser?.lastName || ``);
  const [email, setEmail] = useState(selectedUser?.email || ``);
  const [isManager, setIsManager] = useState(selectedUser?.isManager || false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigator = useNavigation();

  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );

  const recuperaDadosUsuario = async () => {
    const data = await getLoggedInUser();
    console.log(`${data.result}`);
  };

  const handleSaveDataUser = () => {
    //TODO: save
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.input}>
          <StyledLabel>First Name</StyledLabel>
          <StyledInput
            textContentType="name"
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />

          <StyledLabel>Last Name</StyledLabel>
          <StyledInput
            textContentType="name"
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />

          <StyledLabel>Email</StyledLabel>
          <StyledInput
            textContentType="emailAddress"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />

          <StyledLabel>Password</StyledLabel>
          <StyledInput
            textContentType="password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(value) => setPassword(value)}
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
          <OptionListButton onPress={() => handleSaveDataUser}>
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