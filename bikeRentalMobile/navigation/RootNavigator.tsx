import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/loginScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTagNavigator";
import AddBike from "../screens/bike/AddBike";
import ReservationList from "../screens/reservations/reservationList";
import HomePage from "../screens/home/homeScreen";
import BikeList from "../screens/bike/BikeList";
import SelectedBike from "../screens/bike/SelectedBike";
import SelectedReservation from "../screens/reservations/SelectedReservation";
import UserProfileForm from "../screens/profile/UserProfileForm";
import UsersList from "../screens/profile/usersList";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectedUser"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={UserProfileForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddUser"
        component={UserProfileForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsersList"
        component={UsersList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={UserProfileForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="AddBike"
        component={AddBike}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SelectedReservation"
        component={SelectedReservation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ReservationList"
        component={ReservationList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BikeList"
        component={BikeList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectedBike"
        component={SelectedBike}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootNavigator;
