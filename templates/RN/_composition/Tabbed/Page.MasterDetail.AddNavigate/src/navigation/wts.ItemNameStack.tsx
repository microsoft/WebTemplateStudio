import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import wts.ItemNameScreen from '../screens/wts.ItemName/wts.ItemNameScreen';
import DetailScreen from '../screens/wts.ItemName/Detail/DetailScreen';
import {getScreenOptions} from './navigation.options';

const Stack = createStackNavigator();

const wts.ItemNameStack = (): JSX.Element => {
  const screenOptions = getScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="wts.ItemName"
        component={wts.ItemNameScreen}
        options={{title: 'wts.ItemName'}}
      />
      <Stack.Screen
        name="wts.ItemNameDetail"
        component={DetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default wts.ItemNameStack;
