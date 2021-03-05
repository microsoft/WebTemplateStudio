import {Theme} from './Theme.interface';
import {DefaultTheme} from '@react-navigation/native';

export const LIGHT_THEME_NAME = 'light';
export const LIGHT_THEME: Theme = {
  color: {...DefaultTheme.colors},
  navigationTheme: DefaultTheme,
};
