import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack';
import Master_DetailStack from './Master_DetailStack';
import SettingsStack from './SettingsStack';
import {getTabBarOptions} from './navigation.options';
import {useTheme} from '../context/ThemeContext';

interface IScreenOpts {
  route: any;
}

interface ITabBarIconProps {
  focused: boolean;
  size: number;
  color: string;
}

const TabNavigation = (): JSX.Element => {
  // For more information about react navigation visit: https://reactnavigation.org/docs/getting-started
  const Tab = createBottomTabNavigator();
  const {theme} = useTheme();
  const tabBarOptions = getTabBarOptions(theme);

  const getIcon = (routeName: string, isFocused: boolean) => {
    // For more information about vector icons visit: https://github.com/oblador/react-native-vector-icons
    let icon;
    switch (routeName) {
      case 'Settings':
        icon = 'settings';
        break;
      default:
        icon = 'md-square';
    }
    if (!isFocused) {
      icon = icon.concat('-outline');
    }
    return icon;
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}: IScreenOpts) => ({
        tabBarIcon: ({focused, size, color}: ITabBarIconProps) => {
          const iconName = getIcon(route.name, focused);
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Master_Detail" component={Master_DetailStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
