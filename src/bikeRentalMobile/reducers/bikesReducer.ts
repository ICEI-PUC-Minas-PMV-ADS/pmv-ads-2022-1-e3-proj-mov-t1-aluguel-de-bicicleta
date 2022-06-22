import crudReducer from "./crudReducer";

export const BIKE_REDUCER_OPTIONS = {
  FETCH_ALL: "FETCH_ALL_BIKES",
  CREATE: "CREATE_BIKE",
  UPDATE: "UPDATE_BIKE",
  DELETE: "DELETE_BIKE",
};

const bikesReducer = (
  bikes: IBike[] = [],
  action: ICrudReducerAction = { type: "", payload: [] }
): IBike[] => crudReducer(bikes, action, BIKE_REDUCER_OPTIONS) as IBike[];

export default bikesReducer;
