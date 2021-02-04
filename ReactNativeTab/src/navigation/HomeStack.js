import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import themes from '../themes';

import useThemeContext from '../hooks/useThemeContext';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const HomeStack = () => {
  const { theme } = useThemeContext();
  // const theme = themes[theme];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
