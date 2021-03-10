import AsyncStorage from '@react-native-async-storage/async-storage';
import {DARK_THEME} from './DefaultDark.theme';
import {LIGHT_THEME} from './DefaultLight.theme';
import {Theme, ThemeName} from './Theme.interface';

const themes: Record<ThemeName.light | ThemeName.dark, Theme> = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
};

const STORAGE_THEME_KEY = '@themeName';

export const setThemeNameToStorage = async (themeName: ThemeName) => {
  await AsyncStorage.setItem(STORAGE_THEME_KEY, themeName);
};

export const getThemeNameFromStorage = async () => {
  const themeName = await AsyncStorage.getItem(STORAGE_THEME_KEY);
  return getThemeName(themeName);
};

export const getThemeName = (name: string | null): ThemeName => {
  const themeName = Object.values(ThemeName).find((t) => t === name);
  return themeName ?? ThemeName.default;
};

export default themes;
