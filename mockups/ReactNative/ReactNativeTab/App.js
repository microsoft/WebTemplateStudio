import React from "react";
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