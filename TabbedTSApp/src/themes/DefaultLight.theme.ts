import {Theme} from './Theme.interface';
import {DefaultTheme} from '@react-navigation/native';

export const DEFAULT_LIGHT_THEME_ID = 'light';
export const DEFAULT_LIGHT_THEME: Theme = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: {...DefaultTheme.colors},
  navigationTheme: DefaultTheme,
};
