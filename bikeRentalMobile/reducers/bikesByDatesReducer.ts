export const BIKES_BY_DATES_REDUCER_OPTIONS = {
  SET_BIKES_BY_DATES: "SET_BIKES_BY_DATES",
};

const optionValues = Object.values(BIKES_BY_DATES_REDUCER_OPTIONS);

interface IAction {
  payload: IBike[] | null;
  type: typeof optionValues[number];
}

const defaultAction = { type: "", payload: [] };

const bikesByDates = (
  selectedBike: IBike[] | null = null,
  action: IAction = defaultAction
): IBike[] | null => {
  const { SET_BIKES_BY_DATES } = BIKES_BY_DATES_REDUCER_OPTIONS;
  switch (action.type) {
    case SET_BIKES_BY_DATES:
      return action.payload;
    default:
      return selectedBike;
  }
};

export default bikesByDates;
