import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

// import MasterDetailStack from './MasterDetailStack';
import HomeStack from './HomeStack';
// import SettingsStack from './SettingsStack';

const TabNavigation = (): JSX.Element => {
  // For more information about react navigation visit: https://reactnavigation.org/docs/getting-started
  const Tab = createBottomTabNavigator();

  const getIcon = (routeName: string, isFocused: boolean) => {
    // For more information about vector icons visit: https://github.com/oblador/react-native-vector-icons
    let icon;
    switch (routeName) {
      case 'Home':
        icon = 'home';
        break;
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
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName = getIcon(route.name, focused);

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      {/* <Tab.Screen
        name="MasterDetailStack"
        component={MasterDetailStack}
        options={{ title: 'Master Detail' }}
      />*/}

      {/* Place this at the end */}
      {/* <Tab.Screen name="Settings" component={SettingsStack} /> } */}
    </Tab.Navigator>
  );
};

export default TabNavigation;
