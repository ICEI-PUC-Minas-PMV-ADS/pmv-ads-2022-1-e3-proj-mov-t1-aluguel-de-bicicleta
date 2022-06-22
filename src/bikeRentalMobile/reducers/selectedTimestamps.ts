export const SELECTED_TIMESTAMPS_REDUCER_OPTIONS = {
  SET_SELECTED_START: "SET_SELECTED_START",
  SET_SELECTED_END: "SET_SELECTED_END",
  RESET_TIMESTAMPS: "RESET_TIMESTAMPS",
};

const optionValues = Object.values(SELECTED_TIMESTAMPS_REDUCER_OPTIONS);

interface IAction {
  payload: number;
  type: typeof optionValues[number];
}

const defaultAction = { type: "", payload: 0 };
const halfHourInMilisseconds = 30 * 60 * 1000;
const now = new Date().getTime();
const nextExactTime =
  now + halfHourInMilisseconds - (now % halfHourInMilisseconds);
const defaultTimestamps = {
  start: nextExactTime,
  end: nextExactTime + halfHourInMilisseconds,
};

const selectedTimestampsReducer = (
  selectedTimestamps: ITimestamps = defaultTimestamps,
  action: IAction = defaultAction
): ITimestamps | null => {
  const { SET_SELECTED_START, SET_SELECTED_END, RESET_TIMESTAMPS } =
    SELECTED_TIMESTAMPS_REDUCER_OPTIONS;
  switch (action.type) {
    case SET_SELECTED_START:
      return { ...selectedTimestamps, start: action.payload };
    case SET_SELECTED_END:
      return { ...selectedTimestamps, end: action.payload };
    case RESET_TIMESTAMPS:
      return defaultTimestamps;
    default:
      return selectedTimestamps;
  }
};

export default selectedTimestampsReducer;
