import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from '../screens/Settings/SettingsScreen';
import {getScreenOptions} from './navigation.options';
import {useTheme} from '../context/ThemeContext';

const Stack = createStackNavigator();

const SettingsStack = (): JSX.Element => {
  const {theme} = useTheme();
  const screenOptions = getScreenOptions(theme);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
