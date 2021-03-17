import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import wts.ItemName from '../screens/wts.ItemName/wts.ItemNameScreen';

import {getScreenOptions} from './navigation.options';

const Stack = createStackNavigator();

const wts.ItemNameStack = (): JSX.Element => {
  const screenOptions = getScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="wts.ItemName" component={wts.ItemName} />
    </Stack.Navigator>
  );
};

export default wts.ItemNameStack;
