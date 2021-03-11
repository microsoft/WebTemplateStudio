import AsyncStorage from '@react-native-async-storage/async-storage';
import {DarkTheme} from './DarkTheme';
import {LightTheme} from './LightTheme';
import {Theme, ThemeName} from './Theme.interface';

const themes: Record<ThemeName.light | ThemeName.dark, Theme> = {
  light: LightTheme,
  dark: DarkTheme,
};

const STORAGE_THEME_KEY = '@themeName';

const setThemeNameToStorage = async (themeName: ThemeName) => {
  await AsyncStorage.setItem(STORAGE_THEME_KEY, themeName);
};

const getThemeNameFromStorage = async () => {
  const themeName = await AsyncStorage.getItem(STORAGE_THEME_KEY);
  return getThemeName(themeName);
};

const getThemeName = (name: string | null): ThemeName => {
  const themeName = Object.values(ThemeName).find((t) => t === name);
  return themeName ?? ThemeName.default;
};

export {themes, setThemeNameToStorage, getThemeNameFromStorage};
