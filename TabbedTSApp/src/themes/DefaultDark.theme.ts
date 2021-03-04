import {Theme} from './Theme.interface';
import {DarkTheme} from '@react-navigation/native';

export const DEFAULT_DARK_THEME_ID = 'default-dark';
export const DEFAULT_DARK_THEME: Theme = {
  id: DEFAULT_DARK_THEME_ID,
  color: {...DarkTheme.colors},
  navigationTheme: DarkTheme,
};
