import {Theme, ThemeName} from './Theme.interface';
import {DarkTheme} from '@react-navigation/native';

export const DARK_THEME: Theme = {
  name: ThemeName.DARK,
  ...DarkTheme,
};
