import React, {useCallback, useState} from 'react';
import {Appearance} from 'react-native';
import themes from '../themes';
import {Theme, ThemeName} from '../themes/Theme.interface';

interface ProvidedValue {
  theme: Theme;
  setTheme: (themeName: ThemeName) => void;
}

interface Props {
  initial: Theme;
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = useState<Theme>(props.initial);

  const SetThemeCallback = useCallback((name: ThemeName) => {
    if (name === ThemeName.DEFAULT) {
      const deviceTheme = Appearance.getColorScheme();
      const newTheme = deviceTheme ? themes[deviceTheme] : themes.light;
      setTheme(newTheme);
    } else {
      const newTheme = themes[name];
      setTheme(newTheme);
    }
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

const Context = React.createContext<ProvidedValue>({
  theme: themes.light,
  setTheme: () => undefined,
});

export const useTheme = () => React.useContext(Context);
