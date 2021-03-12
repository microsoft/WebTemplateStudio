import {ThemeName, Theme} from './types';
import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';

export const DarkTheme: Theme = {
  name: ThemeName.dark,
  ...NavigationDarkTheme,
};
