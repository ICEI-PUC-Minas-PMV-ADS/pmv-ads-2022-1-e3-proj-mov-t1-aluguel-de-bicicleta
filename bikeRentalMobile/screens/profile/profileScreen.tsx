import React, { useState, useEffect } from 'react';
import styled from "styled-components/native";
import { RootStackScreenProps } from "../../types";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { defaultPadding } from "../../constants/Layout";
import PageHeader from '../../common/pageHeader';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';


function Perfil({ navigation }: RootStackScreenProps<"Perfil">): JSX.Element {

  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const [user, setUser] = useState(loggedUser?.result);

  useEffect(() => {
    setUser(loggedUser?.result);
  }, [loggedUser]);

  const handleGoToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <StyledSelectedUser>

      <PageHeader pageName="My Profile" navigation={navigation} />

      <StyledUserName>{user.firstName} {user.lastName}</StyledUserName>

      <StyledStrong>email</StyledStrong>
      <StyledUserProp>{user.email}</StyledUserProp>

      <StyledStrong>manager</StyledStrong>
      <StyledUserProp>{user.isManager ? 'Yes' : 'No'}</StyledUserProp>

      <FAB
        style = {styles.fab}
        icon = "pencil"
        onPress= {handleGoToEditProfile}
      />

    </StyledSelectedUser>
  );
}

export default Perfil;

const StyledSelectedUser = styled.View`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`;

const StyledUserName = styled.Text`
  font-size: 20px;
  padding-top: ${defaultPadding}px;
  margin-bottom: 25px;
  color: ${Colors.dark["dark-blue"]};
`;

const StyledStrong = styled.Text`
  color: ${Colors.dark["dark-blue"]};
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledUserProp = styled.Text`
  color: ${Colors.dark.black};
  margin-bottom: 25px;
`;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
    backgroundColor: `${Colors.dark.yellow}`,
  }
});

