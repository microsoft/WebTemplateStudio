import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons"

import useThemeContext from "../hooks/useThemeContext";

import Settings from "./Settings";
import Home from "./Home";
import MasterDetailStack from "./MasterDetailStack";
import themes from "../themes";

export const TabNavigation = () => {
  const { theme } = useThemeContext();
  const selectedTheme = themes[theme];
  
  // https://reactnavigation.org/docs/params
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: selectedTheme.colors.background,
        },
        headerTintColor: selectedTheme.colors.text
      }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }

  function SettingsStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: selectedTheme.colors.background,
        },
        headerTintColor: selectedTheme.colors.text,
      }}>
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "MasterDetailStack") {
            iconName = focused ? "md-square" : "md-square-outline";
          }

          return <Icon name={iconName} size={size} color={color} text={selectedTheme.colors.text} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: selectedTheme.colors.primary,
        inactiveTintColor: selectedTheme.colors.text,
        activeBackgroundColor: selectedTheme.colors.background,
        inactiveBackgroundColor: selectedTheme.colors.background,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="MasterDetailStack" component={MasterDetailStack} options={{ title: "Master Detail" }} />

      {/* Place this at the end */}
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
}

