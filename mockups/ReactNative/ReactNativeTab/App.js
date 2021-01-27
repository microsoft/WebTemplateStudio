import React from "react";
// import { Appearance } from 'react-native'

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import themes from "./themes";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "./context/ThemeProvider";
import { TabNavigation } from "./screens/TabNavigation";

const getDefaultColorScheme = () => {
  //dark, light, null
  const deviceTheme = useColorScheme();
  // console.log(` Appearance.getColorScheme: ${Appearance.getColorScheme()}`)
  // console.log(` useColorScheme: ${useColorScheme()}`)
  return themes[deviceTheme] ?? NavigationDefaultTheme;
};

function App() {
  const theme = getDefaultColorScheme();

  return (
    <ThemeProvider>
      <NavigationContainer theme={theme}>
        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;