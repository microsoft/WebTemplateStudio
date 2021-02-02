import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import themes from '../themes';

import useThemeContext from '../hooks/useThemeContext';
import Home from '../screens/Home';

// For more information about react navigation visit https://reactnavigation.org/docs/params
const Stack = createStackNavigator();

const HomeStack = () => {
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
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
