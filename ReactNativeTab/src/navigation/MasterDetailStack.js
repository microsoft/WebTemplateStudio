import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import themes from '../themes';

import MasterDetail from '../screens/MasterDetail/MasterDetail';
import Detail from '../screens/MasterDetail/Detail';
import useThemeContext from '../hooks/useThemeContext';

const Stack = createStackNavigator();

const MasterDetailStack = () => {
  const { theme } = useThemeContext();
  const selectedTheme = themes[theme];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: selectedTheme.colors.background,
        },
        headerTintColor: selectedTheme.colors.text,
      }}>
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
