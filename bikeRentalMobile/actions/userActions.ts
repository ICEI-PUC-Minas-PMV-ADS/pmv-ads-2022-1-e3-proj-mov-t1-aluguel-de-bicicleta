import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as api from "../services/api";
import { LOGGED_USER_REDUCER_OPTIONS } from "../reducers/loggedUser";
import { USERS_REDUCER_OPTIONS } from "../reducers/usersReducer";
import { SELECTED_USER_REDUCER_OPTIONS } from "../reducers/selectedUserReducer";
import { SEARCH_FILTERS_REDUCER_OPTIONS } from "../reducers/searchFiltersReducer";
import setGlobalNotification from "./globalNotificationActions";
import { handleErrors, ROUTES } from "../common/utils";
import { RootStackParamList } from "../types";
import { setLoggedInUser } from "../services/loggedInServices";

export const loginUser =
  (
    params: ILoginParams,
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">,
    setUserNotFound: (status: boolean) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setUserNotFound(false);

    try {
      const { data } = await api.loginUser(params);
      await setLoggedInUser(data);

      dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER, payload: data });
      setGlobalNotification(
        dispatch,
        `Hello, ${data.result.firstName}`,
        "success"
      );
      navigation.replace("Root");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("login user error", error);
      setUserNotFound(true);
    }
  };

export const createUser =
  (
    params: ISignupParams,
    navigation: NativeStackNavigationProp<RootStackParamList, "Signup">,
    login?: boolean
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.createUser(params);
      console.log(data)
      dispatch({ type: USERS_REDUCER_OPTIONS.CREATE, payload: [data.result] });
      if (login) {
        dispatch({
          type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER,
          payload: data,
        });
        navigation.replace("Root");
        setGlobalNotification(
          dispatch,
          `Welcome ${data.result.firstName}`,
          "success"
        );
      } else {
        navigation.replace("Root");
        setGlobalNotification(dispatch, `User created sucessfuly`, "success");
      }
    } catch (error) {
        console.log("inside catch", error)

      handleErrors(dispatch, error as AxiosError);
    }
  };

export const fetchUsers =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchUsers();
      dispatch({ type: USERS_REDUCER_OPTIONS.FETCH_ALL, payload: data });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const fetchUser =
  (userId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchUser(userId);
      dispatch({
        type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
        payload: data,
      });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const updateUser =
  (
    updatedUser: IUpdateUserParams,
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.updateUser(updatedUser);
      dispatch({ type: USERS_REDUCER_OPTIONS.UPDATE, payload: [data] });
      dispatch({
        type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
        payload: data,
      });
      navigation.replace(`${ROUTES.USERS}/${updatedUser.userId}`);
      setGlobalNotification(dispatch, `User updated sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const deleteUser =
  (user: IStorageResult) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.deleteUser(user._id);
      dispatch({ type: USERS_REDUCER_OPTIONS.DELETE, payload: [user] });
      setGlobalNotification(dispatch, `User deleted sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const setShowUsersWithReservations =
  (status: boolean) =>
  (dispatch: Dispatch): void => {
    const { SHOW_USERS_WITH_RESERVATIONS } = SEARCH_FILTERS_REDUCER_OPTIONS;

    if (status) {
      window.sessionStorage.removeItem(SHOW_USERS_WITH_RESERVATIONS);
    } else {
      window.sessionStorage.setItem(SHOW_USERS_WITH_RESERVATIONS, "true");
    }
    dispatch({
      type: SHOW_USERS_WITH_RESERVATIONS,
      payload: { showUserWithReservation: status },
    });
  };
