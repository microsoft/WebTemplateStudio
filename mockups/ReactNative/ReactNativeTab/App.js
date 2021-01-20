import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Blank } from "./views/Blank";
import { Home } from "./views/Home";
import MasterDetail from "./views/MasterDetail/MasterDetail";
import { ItemDetail } from "./views/MasterDetail/ItemDetail";

// https://reactnavigation.org/docs/params
const Tab = createBottomTabNavigator();
const MasterDetailStack = createStackNavigator();

const MasterDetailStackScreen = () => {
  return (
    <MasterDetailStack.Navigator>
      <MasterDetailStack.Screen name="MasterDetailMaster" component={MasterDetail} />
      <MasterDetailStack.Screen name="MasterDetailItemDetail" component={ItemDetail} />
    </MasterDetailStack.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Blank">
        <Tab.Screen name="Blank" component={Blank} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="MasterDetail" component={MasterDetailStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
