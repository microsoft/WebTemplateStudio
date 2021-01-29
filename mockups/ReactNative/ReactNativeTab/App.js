import React from 'react';
// import { Appearance } from 'react-native'

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import themes from './themes';
import {useColorScheme, StatusBar} from 'react-native';
import {ThemeProvider} from './context/ThemeProvider';
import {TabNavigation} from './screens/TabNavigation';

function App() {
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme] ?? NavigationDefaultTheme;

  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer theme={theme}>
        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
