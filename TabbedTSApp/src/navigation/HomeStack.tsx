import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () : JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
