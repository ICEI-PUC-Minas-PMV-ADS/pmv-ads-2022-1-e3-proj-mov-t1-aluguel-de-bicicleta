import { AxiosError } from "axios";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import * as api from "../services/api";
import { handleErrors, ROUTES } from "../common/utils";
import { RESERVATION_REDUCER_OPTIONS } from "../reducers/reservationsReducer";
import { SELECTED_RESERVATION_REDUCER_OPTIONS } from "../reducers/selectedReservationReducer";
import setGlobalNotification from "./globalNotificationActions";

export const getReservations =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchReservations();
      dispatch({ type: RESERVATION_REDUCER_OPTIONS.FETCH_ALL, payload: data });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };
export const getUserReservations =
  (userId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchUserReservations(userId);
      dispatch({ type: RESERVATION_REDUCER_OPTIONS.FETCH_ALL, payload: data });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const getReservation =
  (reservationId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchReservation(reservationId);
      dispatch({
        type: SELECTED_RESERVATION_REDUCER_OPTIONS.SET_SELECTED_RESERVATION,
        payload: data,
      });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const createReservation =
  (
    newReservation: PostReservation,
    bikeInfo: IBike,
    history: RouteComponentProps["history"]
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.createReservation(newReservation);
      dispatch({
        type: RESERVATION_REDUCER_OPTIONS.CREATE,
        payload: [{ ...data, bikeInfo }],
      });
      history.push(ROUTES.RESERVATIONS);
      setGlobalNotification(
        dispatch,
        `Reservation created sucessfuly`,
        "success"
      );
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const updateReservation =
  (reservationId: string, updatedReservation: PostReservation) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.updateReservation(
        reservationId,
        updatedReservation
      );
      dispatch({ type: RESERVATION_REDUCER_OPTIONS.UPDATE, payload: [data] });
      setGlobalNotification(
        dispatch,
        `Reservation updated sucessfuly`,
        "success"
      );
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const deleteReservation =
  (deletedReservation: IReservation) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.deleteReservation(deletedReservation._id);
      dispatch({
        type: RESERVATION_REDUCER_OPTIONS.DELETE,
        payload: [deletedReservation],
      });
      setGlobalNotification(
        dispatch,
        `Reservation canceled sucessfuly`,
        "success"
      );
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };
