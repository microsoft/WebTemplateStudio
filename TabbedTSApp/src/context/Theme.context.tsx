import React from 'react';
import {ColorSchemeName} from 'react-native';
import {
  DEFAULT_DARK_THEME,
  DEFAULT_DARK_THEME_ID,
} from '../themes/DefaultDark.theme';
import {DEFAULT_LIGHT_THEME} from '../themes/DefaultLight.theme';
import {Theme} from '../themes/Theme.interface';

interface ProvidedValue {
  theme: Theme;
  setTheme: (themeName: ColorSchemeName) => void;
}

const Context = React.createContext<ProvidedValue>({
  theme: DEFAULT_LIGHT_THEME,
  setTheme: () => undefined,
});

interface Props {
  initial: Theme;
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = React.useState<Theme>(props.initial);

  const SetThemeCallback = React.useCallback(
    (newThemeName: ColorSchemeName) => {
      const newTheme =
        newThemeName === DEFAULT_DARK_THEME_ID
          ? DEFAULT_DARK_THEME
          : DEFAULT_LIGHT_THEME;

      setTheme((currentTheme: Theme) => {
        if (currentTheme.id === newTheme.id) {
          return currentTheme;
        }
        return newTheme;
      });
    },
    [],
  );

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValue = {
      theme,
      setTheme: SetThemeCallback,
    };
    return value;
  }, [theme, SetThemeCallback]);

  return (
    <Context.Provider value={MemoizedValue}>{props.children}</Context.Provider>
  );
});

export const useTheme = () => React.useContext(Context);
