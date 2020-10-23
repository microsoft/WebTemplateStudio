import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Blank } from "./views/Blank";
import { Home } from "./views/Home";

// https://reactnavigation.org/docs/params
// https://reactnavigation.org/docs/drawer-based-navigation
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Blank">
        <Drawer.Screen name="Blank" component={Blank} />
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;