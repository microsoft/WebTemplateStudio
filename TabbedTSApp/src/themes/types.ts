import {Theme as NavigationTheme} from '@react-navigation/native';

export interface Theme extends NavigationTheme {
  name: ThemeName;
}

export enum ThemeName {
  light = 'light',
  dark = 'dark',
  default = 'default',
}
