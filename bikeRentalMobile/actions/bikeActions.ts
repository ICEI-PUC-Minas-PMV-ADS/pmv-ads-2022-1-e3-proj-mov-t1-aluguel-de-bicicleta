import { AxiosError } from "axios";
import { Dispatch } from "redux";
import * as api from "../services/api";
import { handleErrors } from "../common/utils";
import { BIKE_REDUCER_OPTIONS } from "../reducers/bikesReducer";
import { SEARCH_FILTERS_REDUCER_OPTIONS } from "../reducers/searchFiltersReducer";
import { SELECTED_BIKE_REDUCER_OPTIONS } from "../reducers/selectedBikeReducer";
import setGlobalNotification from "./globalNotificationActions";

export const getBikes =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchBikes();
      dispatch({ type: BIKE_REDUCER_OPTIONS.FETCH_ALL, payload: data });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const getBike =
  (bikeId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchBike(bikeId);
      dispatch({
        type: SELECTED_BIKE_REDUCER_OPTIONS.SET_SELECTED_BIKE,
        payload: data[0] as IBike,
      });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const createBike =
  (newBike: PostBike) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.createBike(newBike);
      dispatch({ type: BIKE_REDUCER_OPTIONS.CREATE, payload: [data] });
      setGlobalNotification(dispatch, `Bike created sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const updateBike =
  (bikeId: string, updatedBike: PostBike) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.updateBike(bikeId, updatedBike);
      dispatch({ type: BIKE_REDUCER_OPTIONS.UPDATE, payload: [data] });
      setGlobalNotification(dispatch, `Bike updated sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const deleteBike =
  (deletedBike: IBike) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.deleteBike(deletedBike._id);
      dispatch({ type: BIKE_REDUCER_OPTIONS.DELETE, payload: [deletedBike] });
      setGlobalNotification(dispatch, `Bike deleted sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const setBikeRatingFilter =
  (rating: number) =>
  (dispatch: Dispatch): void => {
    const { BIKE_RATING } = SEARCH_FILTERS_REDUCER_OPTIONS;

    window.sessionStorage.setItem(BIKE_RATING, rating.toString());
    dispatch({ type: BIKE_RATING, payload: { bikeRating: rating } });
  };
