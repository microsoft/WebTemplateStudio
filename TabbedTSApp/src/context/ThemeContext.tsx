import React, {useCallback, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {
  themes,
  getThemeNameFromStorage,
  setThemeNameToStorage,
} from '../themes';
import {Theme, ThemeName} from '../themes/types';

interface ProvidedValue {
  theme: Theme;
  setTheme: (name: ThemeName) => void;
}

interface Props {
  children?: React.ReactNode;
}

const initlDefaultTheme = {...themes.light, name: ThemeName.default};

export const ThemeProvider = React.memo<Props>((props) => {
  const deviceTheme = useColorScheme();
  const [defaultTheme, setdefaultTheme] = useState<Theme>(initlDefaultTheme);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(initlDefaultTheme);

  useEffect(() => {
    if (deviceTheme) {
      var newDefaultTheme = {...themes[deviceTheme], name: ThemeName.default};
      setdefaultTheme((oldDefaultTheme: Theme) =>
        oldDefaultTheme.colors === newDefaultTheme.colors
          ? oldDefaultTheme
          : newDefaultTheme,
      );
    }
  }, [deviceTheme]);

  useEffect(() => {
    const checkStoredTheme = async () => {
      const name = await getThemeNameFromStorage();
      const newTheme = name === ThemeName.default ? defaultTheme : themes[name];
      setSelectedTheme(newTheme);
    };
    checkStoredTheme();
  }, [defaultTheme]);

  const setThemeByName = useCallback(
    (name: ThemeName) => {
      const theme = name === ThemeName.default ? defaultTheme : themes[name];
      setSelectedTheme(theme);
      setThemeNameToStorage(theme.name);
    },
    [defaultTheme],
  );

  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValue = {
      theme: selectedTheme,
      setTheme: setThemeByName,
    };
    return value;
  }, [selectedTheme, setThemeByName]);

  return (
    <Context.Provider value={MemoizedValue}>{props.children}</Context.Provider>
  );
});

const Context = React.createContext<ProvidedValue>({
  theme: themes.light,
  setTheme: () => undefined,
});

export const useTheme = () => React.useContext(Context);
