import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/loginScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import EditProfileScreen from "../screens/profile/editProfileScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTagNavigator";
import Perfil from "../screens/profile/profileScreen";
import AddBike from "../screens/bike/AddBike";

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
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBike"
        component={AddBike}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootNavigator;
