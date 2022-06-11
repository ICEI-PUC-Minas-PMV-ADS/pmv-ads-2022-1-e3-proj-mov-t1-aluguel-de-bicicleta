import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SELECTED_BIKE_REDUCER_OPTIONS } from "../../reducers/selectedBikeReducer";
import { LOGGED_USER_REDUCER_OPTIONS } from "../../reducers/loggedUser";
import { SELECTED_USER_REDUCER_OPTIONS } from "../../reducers/selectedUserReducer";
import Colors from "../../constants/Colors";
import {
  checkIfTokenIsExpired,
  logOutUser,
} from "../../services/loggedInServices";
import ConfirmationDialog from "../../common/confirmationDialog";

interface ItemProps {
  to: string;
  text: string;
  icon: string;
}
function OptionsList(): JSX.Element {
  const [showDialog, setShowDialog] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [userIsManager, setUserIsManager] = useState(false);
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  const [user, setUser] = useState(loggedUser?.result);

  useEffect(() => {
    setUser(loggedUser?.result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SELECTED_BIKE_REDUCER_OPTIONS.SET_SELECTED_BIKE,
      payload: null,
    });
    dispatch({
      type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
      payload: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setUserIsLogged(true);
      if (user.isManager) setUserIsManager(true);
      checkIfTokenIsExpired().then((response) => response && handleLogOut());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function handleLogOut(): void {
    logOutUser().then(() => {
      dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGOUT_USER });
      setUserIsLogged?.(false);
      setShowDialog(false);
    });
  }

  let listData: ItemProps[] = [
    { text: "My Profile ", to: "Perfil", icon: "person" },
    { text: "Bikes ", to: "AddBike", icon: "pedal-bike" },
  ];

  if (!userIsLogged) {
    listData = [{ text: "Login", to: "Login", icon: "login" }];
  } else if (userIsManager) {
    listData.push(
      { text: "Users", to: "users", icon: "person-search" },
      { text: "Add new Bike", to: "AddBike", icon: "add" },
      { text: "Add new User", to: "newUser", icon: "add" }
    );
  } else {
    listData.push({
      text: "Reservations ",
      to: "ReservationList",
      icon: "calendar-today",
    });
  }
  return (
    <>
      {listData.map((item) => (
        <OptionListItem item={item} key={item.text} />
      ))}
      {user && (
        <OptionListButton onPress={() => setShowDialog(true)}>
          <ButtonText>Logout </ButtonText>
          <MaterialIcons size={20} name="logout" color="white" />
        </OptionListButton>
      )}
      {showDialog ? (
        <ConfirmationDialog
          onCancel={() => setShowDialog(false)}
          onDelete={() => handleLogOut()}
          text="logout"
        />
      ) : null}
    </>
  );
}

export default OptionsList;
function OptionListItem({ item }: { item: ItemProps }) {
  const navigation = useNavigation();
  return (
    <OptionListButton onPress={() => navigation.navigate(item.to)}>
      <ButtonText>{item.text}</ButtonText>
      <MaterialIcons size={20} name={item.icon} color="white" />
    </OptionListButton>
  );
}
OptionsList.defaultProps = {
  isNav: false,
};

const OptionListButton = styled.Pressable`
  width: 300px;
  padding: 20px;
  background: ${Colors.light.yellow};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: white;
`;

// const StyledOptionsList = styled.View`
//   padding: 0;
//   .optionsList {
//     &--item {
//       list-style: none;
//       &__button {
//         width: 300px;
//         padding: 20px;
//         background: var(--yellow);
//         font-weight: 600;
//         border-radius: 8px;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         font-size: 20px;
//         margin-top: 20px;
//         &,
//         &:visited {
//           color: white;
//         }
//         i {
//           margin-right: 8px;
//         }
//         &:hover {
//           background: var(--red);
//         }
//       }
//     }
//   }
//   &.isNav {
//     .optionsList {
//       &--item {
//         &__button {
//           padding: 10px;
//           border-radius: 10px;
//           padding: 18px 0;
//           border: none;
//           background: white;
//           text-decoration: none;
//           font-size: 18px;
//           justify-content: flex-start;

//           &,
//           &:visited {
//             color: var(--dark-blue);
//           }
//           i {
//             color: var(--yellow);
//           }
//           &:hover {
//             background: lightblue;
//           }
//         }
//       }
//     }
//   }
// `;
