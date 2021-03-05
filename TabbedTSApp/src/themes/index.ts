import {DARK_THEME, DARK_THEME_NAME} from './DefaultDark.theme';
import {LIGHT_THEME, LIGHT_THEME_NAME} from './DefaultLight.theme';
import {Theme} from './Theme.interface';

type ThemeName = typeof LIGHT_THEME_NAME | typeof DARK_THEME_NAME;
const themes: Record<ThemeName, Theme> = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
};

export default themes;
