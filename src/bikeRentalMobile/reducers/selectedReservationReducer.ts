export const SELECTED_RESERVATION_REDUCER_OPTIONS = {
  SET_SELECTED_RESERVATION: "SET_SELECTED_RESERVATION",
};

const optionValues = Object.values(SELECTED_RESERVATION_REDUCER_OPTIONS);

interface IAction {
  payload: IReservation | null;
  type: typeof optionValues[number];
}

const defaultAction = { type: "", payload: null };

const selectedReservationReducer = (
  selectedReservation: IReservation | null = null,
  action: IAction = defaultAction
): IReservation | null => {
  const { SET_SELECTED_RESERVATION } = SELECTED_RESERVATION_REDUCER_OPTIONS;
  switch (action.type) {
    case SET_SELECTED_RESERVATION:
      return action.payload;
    default:
      return selectedReservation;
  }
};

export default selectedReservationReducer;
