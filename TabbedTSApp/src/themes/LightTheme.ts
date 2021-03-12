import {Theme, ThemeName} from './types';
import {DefaultTheme} from '@react-navigation/native';

export const LightTheme: Theme = {
  name: ThemeName.light,
  ...DefaultTheme,
};
