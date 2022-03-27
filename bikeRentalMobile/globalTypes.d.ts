interface IBike extends PostBike {
  _id: string;
  rateAverage: number;
  userRatingValue: number;
  reservations?: IReservation[];
}

interface PostBike {
  model: string;
  color: string;
  location: string;
  isAvailable: boolean;
}
interface IReservation extends PostReservation {
  _id: string;
  userId: string;
  creator: string;
  createdAt: number;
  bikeInfo: IBike;
}

interface PostReservation {
  bikeId: string;
  startTimestamp: number;
  endTimestamp: number;
}
interface IUpdateUserParams extends ISignupParams {
  userId: string;
}

interface LoginParams {
  email: string;
  password: string;
}
interface LogInResponse {
  name: string;
  id: string;
  email: string;
}
interface ILoginParams {
  email: string;
  password: string;
}

interface ISignupParams extends ILoginParams {
  firstName: string;
  lastName: string;
}

interface IlocalStorageProfile {
  result: string;
  token: string;
}
interface UserObject {
  result: IStorageResult;
  token: string;
}

interface IStorageResult extends ISignupParams {
  isManager: boolean;
  reservations: IReservation[];
  _id: string;
}

interface ITimestamps {
  start: number;
  end: number;
}

interface ISearchFilters {
  showUserWithReservation?: boolean;
  bikeRating: number;
}

type AssetType = "user" | "bike";

type GlobalNotificationType = "error" | "success";
interface IGlobalNotification {
  message: string;
  type: GlobalNotificationType;
}

type CrudReducerPossibleTypes = IBike | IReservation | IStorageResult;
interface ICrudReducerAction {
  type: string;
  payload: CrudReducerPossibleTypes[];
}
