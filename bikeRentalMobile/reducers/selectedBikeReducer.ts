export const SELECTED_BIKE_REDUCER_OPTIONS = {
  SET_SELECTED_BIKE: "SET_SELECTED_BIKE",
};

const optionValues = Object.values(SELECTED_BIKE_REDUCER_OPTIONS);

interface IAction {
  payload: IBike | null;
  type: typeof optionValues[number];
}

const defaultAction = { type: "", payload: null };

const selectedBikeReducer = (
  selectedBike: IBike | null = null,
  action: IAction = defaultAction
): IBike | null => {
  const { SET_SELECTED_BIKE } = SELECTED_BIKE_REDUCER_OPTIONS;
  switch (action.type) {
    case SET_SELECTED_BIKE:
      return action.payload;
    default:
      return selectedBike;
  }
};

export default selectedBikeReducer;
