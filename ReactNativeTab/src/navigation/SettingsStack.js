import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import themes from '../themes';

import useThemeContext from '../hooks/useThemeContext';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const SettingsStack = () => {
  const { theme } = useThemeContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
