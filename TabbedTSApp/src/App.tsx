import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import TabNavigation from './navigation/TabNavigation';

import {ThemeProvider} from './context/Theme.context';
import {useColorScheme} from 'react-native';
import themes from './themes';

function App(): JSX.Element {
  const deviceTheme = useColorScheme();
  const theme = deviceTheme ? themes[deviceTheme] : themes.light;
  return (
    <ThemeProvider initial={theme}>
      <NavigationContainer theme={theme}>
        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
