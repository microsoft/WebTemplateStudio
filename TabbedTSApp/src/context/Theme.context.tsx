import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import themes from '../themes';
import {Theme, ThemeName} from '../themes/Theme.interface';

interface ProvidedValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
}

interface Props {
  initial: Theme;
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = useState<Theme>(props.initial);
  const [themeName, setThemeName] = useState<ThemeName>(ThemeName.default);
  const deviceTheme = useColorScheme();

  useEffect(() => {
    if (themeName === ThemeName.default) {
      const newTheme = deviceTheme ? themes[deviceTheme] : themes.light;
      console.log('Change default Theme: ' + newTheme.name);
      setTheme(newTheme);
    } else {
      const newTheme = themes[themeName];
      console.log('Change Theme: ' + newTheme.name);
      setTheme(newTheme);
    }
  }, [themeName, deviceTheme]);

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValue = {
      theme,
      themeName,
      setTheme: setThemeName,
    };
    return value;
  }, [theme, themeName, setThemeName]);

  return (
    <Context.Provider value={MemoizedValue}>{props.children}</Context.Provider>
  );
});

const Context = React.createContext<ProvidedValue>({
  theme: themes.light,
  themeName: ThemeName.default,
  setTheme: () => undefined,
});

export const useTheme = () => React.useContext(Context);
