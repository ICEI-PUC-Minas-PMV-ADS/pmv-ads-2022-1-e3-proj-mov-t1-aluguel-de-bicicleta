import bikesReducer, { BIKE_REDUCER_OPTIONS } from "../bikesReducer";
import { getBikeTestData, getNewBikeTestData } from "../../common/testData";

const { FETCH_ALL, CREATE, UPDATE, DELETE } = BIKE_REDUCER_OPTIONS;

describe("bike reducer test", () => {
  let bikeData: IBike[] = [];
  let newBike: IBike = getNewBikeTestData();

  beforeEach(() => {
    bikeData = [getBikeTestData()];
    newBike = getNewBikeTestData();
  });
  describe("default", () => {
    it("returns current state", () => {
      expect(bikesReducer(bikeData, { type: "", payload: [] })).toStrictEqual(
        bikeData
      );
    });
  });
  describe("fetch", () => {
    it("returns the payload", () => {
      expect(
        bikesReducer([], { type: FETCH_ALL, payload: bikeData })
      ).toStrictEqual(bikeData);
    });
  });
  describe("create", () => {
    it("adds bike to result", () => {
      expect(
        bikesReducer(bikeData, { type: CREATE, payload: [newBike] })
      ).toStrictEqual([...bikeData, newBike]);
    });
  });
  describe("update", () => {
    const alteredBike = getBikeTestData();
    alteredBike.model = "altered Model";
    it("updates bikes array", () => {
      expect(
        bikesReducer(bikeData, { type: UPDATE, payload: [alteredBike] })
      ).toStrictEqual([alteredBike]);
      expect(
        bikesReducer([...bikeData, newBike], {
          type: UPDATE,
          payload: [alteredBike],
        })
      ).toStrictEqual([alteredBike, newBike]);
    });
  });
  describe("delete", () => {
    it("deletes bike", () => {
      expect(
        bikesReducer(bikeData, { type: DELETE, payload: bikeData })
      ).toStrictEqual([]);
      expect(
        bikesReducer([...bikeData, newBike], {
          type: DELETE,
          payload: bikeData,
        })
      ).toStrictEqual([newBike]);
    });
  });
});
