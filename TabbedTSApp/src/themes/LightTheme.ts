import {Theme, ThemeName} from './Theme.interface';
import {DefaultTheme} from '@react-navigation/native';

export const LightTheme: Theme = {
  name: ThemeName.light,
  ...DefaultTheme,
};
