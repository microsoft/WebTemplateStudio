import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Settings from '../screens/Settings/SettingsScreen';

const Stack = createStackNavigator();

const SettingsStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
