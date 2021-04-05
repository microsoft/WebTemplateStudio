import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Master_DetailScreen from '../screens/Master_Detail/Master_DetailScreen';
import DetailScreen from '../screens/Master_Detail/Detail/DetailScreen';
import {getScreenOptions} from './navigation.options';
import {useTheme} from '../context/ThemeContext';

const Stack = createStackNavigator();

const Master_DetailStack = (): JSX.Element => {
  const {theme} = useTheme();
  const screenOptions = getScreenOptions(theme);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Master_Detail"
        component={Master_DetailScreen}
        options={{title: 'Master_Detail'}}
      />
      <Stack.Screen
        name="Master_DetailDetail"
        component={DetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default Master_DetailStack;
