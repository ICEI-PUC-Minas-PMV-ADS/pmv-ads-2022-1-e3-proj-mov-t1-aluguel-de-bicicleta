import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";

interface IProps {
  pageName: string;
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}

function PageHeader({ pageName, navigation }: IProps): JSX.Element {
  return (
    <StyledPageHeader>
      <StyledBackArrow onPress={() => navigation.goBack()}>
        <AntDesign
          size={40}
          style={{ marginBottom: -3, paddingLeft: 5 }}
          name="arrowleft"
          color={Colors.light.red}
        />
      </StyledBackArrow>
      <StyledPageTitle style={{ color: "black" }}>{pageName}</StyledPageTitle>
    </StyledPageHeader>
  );
}

export default PageHeader;
const StyledBackArrow = styled.Pressable`
  color: ${Colors.light.red};
`;

const StyledPageHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledPageTitle = styled.Text`
  font-size: 25px;
  margin-left: 15px;
`;
