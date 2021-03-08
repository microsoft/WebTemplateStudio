import {Theme, ThemeName} from './Theme.interface';
import {DefaultTheme} from '@react-navigation/native';

export const LIGHT_THEME: Theme = {
  name: ThemeName.LIGHT,
  ...DefaultTheme,
};
