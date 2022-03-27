/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_USER_REDUCER_OPTIONS } from "../reducers/loggedUser";
import { getLoggedInUser } from "../services/loggedInServices";
import LinkingConfiguration from "./LinkingConfiguration";
import RootNavigator from "./RootNavigator";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector(
    (state: { loggedUser: UserObject }) => state
  );
  React.useEffect(() => {
    if (!loggedUser) {
      getLoggedInUser().then((response) => {
        if (response) {
          dispatch({
            type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER,
            payload: response,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
