import {DARK_THEME} from './DefaultDark.theme';
import {LIGHT_THEME} from './DefaultLight.theme';
import {Theme, ThemeName} from './Theme.interface';

const themes: Record<ThemeName.light | ThemeName.dark, Theme> = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
};

export default themes;
