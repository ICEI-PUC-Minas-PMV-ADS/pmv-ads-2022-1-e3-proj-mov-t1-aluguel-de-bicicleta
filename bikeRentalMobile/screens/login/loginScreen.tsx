import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { loginUser } from "../../actions/userActions";
import PageHeader from "../../common/pageHeader";
import {
  SubmitPressableText,
  StyledForm,
  SubmitPressable,
} from "../../common/styled";
import UserInfo from "../../common/userInfo";
import { ROUTES } from "../../common/utils";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import { RootStackScreenProps } from "../../types";
import Logo from "../img/logo";

function Login({ navigation }: RootStackScreenProps<"Login">): JSX.Element {
//  const [email, setEmail] = useState("test@gmail.com");
//  const [password, setPassword] = useState(`12345678`);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [userNotFound, setUserNotFound] = useState(false);
  const dispatch = useDispatch();
  function handleLogin(): void {
    dispatch(loginUser({ email, password }, navigation, setUserNotFound));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MiniBanner>
        <Logo />
      </MiniBanner>
      <StyledLogin behavior="padding">
        <PageHeader pageName="Login" navigation={navigation} />
        <StyledForm>
          <UserInfo

            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin
          />
          <SubmitPressable style={{ marginTop: 50 }} onPress={handleLogin}>
            <SubmitPressableText>Login</SubmitPressableText>
            <MaterialIcons size={30} name="login" color="white" />
          </SubmitPressable>
        </StyledForm>

        {userNotFound ? (
          <StyledUserNotFound>USER NOT FOUND</StyledUserNotFound>
        ) : null}
        <StyledSignupLink
          style={{ color: Colors.light["dark-blue"], fontSize: 15 }}
          onPress={() => navigation.navigate('Signup')}
        >
          Need to create an account? Sign up here!
        </StyledSignupLink>
      </StyledLogin>
    </SafeAreaView>
  );
}

export default Login;
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
