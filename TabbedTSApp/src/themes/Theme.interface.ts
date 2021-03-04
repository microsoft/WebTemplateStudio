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
  id: string;
  color: ColorTheme;
  navigationTheme: NavigationTheme;
}
