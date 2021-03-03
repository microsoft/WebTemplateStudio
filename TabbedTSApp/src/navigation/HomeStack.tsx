import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home/HomeScreen';
import {getScreenOptions} from './navigation.options';

const Stack = createStackNavigator();

const HomeStack = (): JSX.Element => {
  const screenOptions = getScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
