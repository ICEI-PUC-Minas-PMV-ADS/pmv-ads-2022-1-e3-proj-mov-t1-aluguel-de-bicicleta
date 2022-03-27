import crudReducer from "./crudReducer";

export const RESERVATION_REDUCER_OPTIONS = {
  FETCH_ALL: "FETCH_ALL_RESERVATIONS",
  CREATE: "CREATE_RESERVATION",
  UPDATE: "UPDATE_RESERVATION",
  DELETE: "DELETE_RESERVATION",
};

const reservationsReducer = (
  reservations: IReservation[] = [],
  action: ICrudReducerAction = { type: "", payload: [] }
): IReservation[] =>
  crudReducer(
    reservations,
    action,
    RESERVATION_REDUCER_OPTIONS
  ) as IReservation[];

export default reservationsReducer;
