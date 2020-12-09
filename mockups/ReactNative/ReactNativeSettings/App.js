import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator  } from "@react-navigation/stack";

import { Settings } from "./views/Settings";
import { Home } from "./views/Home";

import Icon from 'react-native-vector-icons/Ionicons'

// https://reactnavigation.org/docs/params
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//TODO: investigating several types of navigation. Stack.Navigator would display the nice header that displays the section
//TODO: Have a look and see where exactly we want to have the settings option. Always visible or hidden
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
        <Tab.Screen name="Home2" component={Home} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;