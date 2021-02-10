import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MasterDetail from '../screens/MasterDetail/MasterDetail';
import Detail from '../screens/MasterDetail/Detail/Detail';
import useThemeContext from '../hooks/useThemeContext';
import { getScreenOptions } from './navigation.options';

const Stack = createStackNavigator();

const MasterDetailStack = () => {
  const { theme } = useThemeContext();
  const screenOptions = getScreenOptions(theme);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MasterDetail"
        component={MasterDetail}
        options={{ title: 'Master Detail' }}
      />
      <Stack.Screen
        name="MasterDetailDetail"
        component={Detail}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

export default MasterDetailStack;
