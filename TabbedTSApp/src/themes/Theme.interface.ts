import {Theme as NavigationTheme} from '@react-navigation/native';

export interface ColorTheme {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
}
export interface Theme {
  color: ColorTheme;
  navigationTheme: NavigationTheme;
}

export type ThemeName = 'light' | 'dark';
