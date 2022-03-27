import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import HomeScreen from "../screens/home/homeScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootTabParamList } from "../types";
import { HomeTabBarIcon, TabTwoBarIcon } from "./BottomTabBarIcons";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].yellow,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: HomeTabBarIcon,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={() => ({
          title: "Tab Two",
          tabBarIcon: TabTwoBarIcon,
          headerRight: TabTwoHeader,
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabTwoHeader() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Modal")}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <FontAwesome
        name="info-circle"
        size={25}
        color={Colors[colorScheme].black}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
}
export default BottomTabNavigator;
