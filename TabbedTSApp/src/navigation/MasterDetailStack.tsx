import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MasterDetailScreen from '../screens/MasterDetail/MasterDetailScreen';
import DetailScreen from '../screens/MasterDetail/Detail/DetailScreen';
import {getScreenOptions} from './navigation.options';

const Stack = createStackNavigator();

const MasterDetailStack = (): JSX.Element => {
  const screenOptions = getScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MasterDetail"
        component={MasterDetailScreen}
        options={{title: 'Master Detail'}}
      />
      <Stack.Screen
        name="MasterDetailDetail"
        component={DetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default MasterDetailStack;
