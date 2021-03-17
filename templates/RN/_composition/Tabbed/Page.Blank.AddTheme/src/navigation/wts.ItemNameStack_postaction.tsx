import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import wts.ItemName from '../screens/wts.ItemName/wts.ItemNameScreen';
import {getScreenOptions} from './navigation.options';
//{[{
import {useTheme} from '../context/ThemeContext';
//}]}
const wts.ItemNameStack = (): JSX.Element => {
  //{[{
  const {theme} = useTheme();
  //}]}
  const screenOptions = getScreenOptions(/*{[{*/theme/*}]}*/);
};