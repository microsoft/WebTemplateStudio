import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import useThemeContext from '../../hooks/useThemeContext';
import themes from '../../themes';

import MasterDetailStack from './MasterDetailStack';
import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';

const TabNavigation = () => {
  const {theme} = useThemeContext();
  const selectedTheme = themes[theme];

  // For more information about react navigation visit https://reactnavigation.org/docs/hello-react-navigations
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'MasterDetailStack') {
            iconName = focused ? 'md-square' : 'md-square-outline';
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              text={selectedTheme.colors.text}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: selectedTheme.colors.primary,
        inactiveTintColor: selectedTheme.colors.text,
        activeBackgroundColor: selectedTheme.colors.background,
        inactiveBackgroundColor: selectedTheme.colors.background,
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="MasterDetailStack"
        component={MasterDetailStack}
        options={{title: 'Master Detail'}}
      />

      {/* Place this at the end */}
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
