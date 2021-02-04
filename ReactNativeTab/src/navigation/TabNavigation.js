import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import useThemeContext from '../hooks/useThemeContext';

import MasterDetailStack from './MasterDetailStack';
import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';

const TabNavigation = () => {
  const { theme } = useThemeContext();
  // const {colors} = useTheme();

  // For more information about react navigation visit: https://reactnavigation.org/docs/getting-started
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'MasterDetailStack') {
            iconName = focused ? 'md-square' : 'md-square-outline';
          }

          // For more information about vector icons visit: https://github.com/oblador/react-native-vector-icons
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              text={theme.colors.text}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.text,
        activeBackgroundColor: theme.colors.background,
        inactiveBackgroundColor: theme.colors.background,
        style: {
          backgroundColor: theme.colors.border,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        },
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="MasterDetailStack"
        component={MasterDetailStack}
        options={{ title: 'Master Detail' }}
      />

      {/* Place this at the end */}
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
