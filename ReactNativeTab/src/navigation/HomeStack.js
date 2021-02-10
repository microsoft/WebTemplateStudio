import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import useThemeContext from '../hooks/useThemeContext';
import Home from '../screens/Home/Home';
import { getScreenOptions } from './navigation.options';

const Stack = createStackNavigator();

const HomeStack = () => {
  const { theme } = useThemeContext();
  const screenOptions = getScreenOptions(theme);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
