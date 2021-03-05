import React from 'react';
import {ColorSchemeName} from 'react-native';
import themes from '../themes';
import {LIGHT_THEME_NAME} from '../themes/DefaultLight.theme';
import {Theme} from '../themes/Theme.interface';

interface ProvidedValue {
  theme: Theme;
  setTheme: (themeName: ColorSchemeName) => void;
}

const Context = React.createContext<ProvidedValue>({
  theme: themes.light,
  setTheme: () => undefined,
});

interface Props {
  initial: Theme;
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = React.useState<Theme>(props.initial);

  const SetThemeCallback = React.useCallback((name: ColorSchemeName) => {
    const newTheme = themes[name ?? LIGHT_THEME_NAME];
    setTheme(newTheme);
  }, []);

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
