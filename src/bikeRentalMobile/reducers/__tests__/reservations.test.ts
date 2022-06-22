import reservationsReducer, {
  RESERVATION_REDUCER_OPTIONS,
} from "../reservationsReducer";
import {
  getReservationTestData,
  getNewReservationTestData,
} from "../../common/testData";

const { FETCH_ALL, CREATE, UPDATE, DELETE } = RESERVATION_REDUCER_OPTIONS;

describe("reservation reducer test", () => {
  let reservationData: IReservation[] = [];
  let newReservation: IReservation = getNewReservationTestData();

  beforeEach(() => {
    reservationData = [getReservationTestData()];
    newReservation = getNewReservationTestData();
  });
  describe("default", () => {
    it("returns current state", () => {
      expect(
        reservationsReducer(reservationData, { type: "", payload: [] })
      ).toStrictEqual(reservationData);
    });
  });
  describe("fetch", () => {
    it("returns the payload", () => {
      expect(
        reservationsReducer([], { type: FETCH_ALL, payload: reservationData })
      ).toStrictEqual(reservationData);
    });
  });
  describe("create", () => {
    it("adds reservation to result", () => {
      expect(
        reservationsReducer(reservationData, {
          type: CREATE,
          payload: [newReservation],
        })
      ).toStrictEqual([...reservationData, newReservation]);
    });
  });
  describe("update", () => {
    const alteredReservation = getReservationTestData();
    alteredReservation.bikeId = "altered bikeId";
    it("updates reservations array", () => {
      expect(
        reservationsReducer(reservationData, {
          type: UPDATE,
          payload: [alteredReservation],
        })
      ).toStrictEqual([alteredReservation]);
      expect(
        reservationsReducer([...reservationData, newReservation], {
          type: UPDATE,
          payload: [alteredReservation],
        })
      ).toStrictEqual([alteredReservation, newReservation]);
    });
  });
  describe("delete", () => {
    it("deletes reservation", () => {
      expect(
        reservationsReducer(reservationData, {
          type: DELETE,
          payload: reservationData,
        })
      ).toStrictEqual([]);
      expect(
        reservationsReducer([...reservationData, newReservation], {
          type: DELETE,
          payload: reservationData,
        })
      ).toStrictEqual([newReservation]);
    });
  });
});
