import { AxiosError } from "axios";
import { Dispatch } from "redux";
import * as api from "../services/api";
import { handleErrors } from "../common/utils";
import { BIKES_BY_DATES_REDUCER_OPTIONS } from "../reducers/bikesByDatesReducer";

export const getBikesByDates =
  (dates: ITimestamps) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchBikesByDates(dates);
      dispatch({
        type: BIKES_BY_DATES_REDUCER_OPTIONS.SET_BIKES_BY_DATES,
        payload: data,
      });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export default getBikesByDates;
