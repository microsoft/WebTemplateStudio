import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import themes from '../themes';

import useThemeContext from '../hooks/useThemeContext';
import Settings from './Settings';

const Stack = createStackNavigator();

const SettingsStack = () => {
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
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
