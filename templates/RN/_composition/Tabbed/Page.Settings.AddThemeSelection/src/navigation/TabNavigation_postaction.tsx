import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {getTabBarOptions} from './navigation.options';
//{[{
import {useTheme} from '../context/ThemeContext';
//}]}
const TabNavigation = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  //{[{
  const {theme} = useTheme();
  //}]}
  const tabBarOptions = getTabBarOptions(/*{[{*/theme/*}]}*/);
};
