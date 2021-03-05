import {Theme} from './Theme.interface';
import {DarkTheme} from '@react-navigation/native';

export const DARK_THEME_NAME = 'dark';
export const DARK_THEME: Theme = {
  color: {...DarkTheme.colors},
  navigationTheme: DarkTheme,
};
