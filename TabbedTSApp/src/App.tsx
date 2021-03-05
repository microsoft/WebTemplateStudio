import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import TabNavigation from './navigation/TabNavigation';

import {ThemeProvider} from './context/Theme.context';
import {useColorScheme} from 'react-native';
import themes from './themes';
import {DARK_THEME_NAME} from './themes/DefaultDark.theme';

function App(): JSX.Element {
  const deviceTheme = useColorScheme();
  const theme = deviceTheme === DARK_THEME_NAME ? themes.dark : themes.light;
  return (
    <ThemeProvider initial={theme}>
      <NavigationContainer theme={theme.navigationTheme}>
        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
