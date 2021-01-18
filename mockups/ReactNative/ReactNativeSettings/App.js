import * as React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import ThemeProvider from "./context/ThemeProvider"

import { Settings } from "./screens/Settings";
import { Home } from "./screens/Home";

import Icon from 'react-native-vector-icons/Ionicons'

// https://reactnavigation.org/docs/params
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeStack} />
          {/* Place this at the end */}
          <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;