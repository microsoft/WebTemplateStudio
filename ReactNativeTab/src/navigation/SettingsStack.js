import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import useThemeContext from '../hooks/useThemeContext';
import Settings from '../screens/Settings/Settings';
import { getScreenOptions } from './navigation.options';

const Stack = createStackNavigator();

const SettingsStack = () => {
  const { theme } = useThemeContext();
  const screenOptions = getScreenOptions(theme);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
