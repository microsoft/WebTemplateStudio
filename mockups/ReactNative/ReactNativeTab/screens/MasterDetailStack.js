import * as React from "react";

import {createStackNavigator} from "@react-navigation/stack";

import themes from "../themes";

import MasterDetail from "./MasterDetail/MasterDetail";
import Detail from "./MasterDetail/Detail";
import useThemeContext from "../hooks/useThemeContext";

// https://reactnavigation.org/docs/params
const Stack = createStackNavigator();

const MasterDetailStack = () => {
  const {theme} = useThemeContext();
  const selectedTheme = themes[theme];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: selectedTheme.colors.background,
        },
        headerTintColor: selectedTheme.colors.text,
      }}>
      <Stack.Screen
        name="MasterDetail"
        component={MasterDetail}
        options={{title: "Master Detail"}}
      />
      <Stack.Screen
        name="MasterDetailDetail"
        component={Detail}
        options={{title: "Detail"}}
      />
    </Stack.Navigator>
  );
};

export default MasterDetailStack;
