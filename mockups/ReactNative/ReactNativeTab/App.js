import React from 'react';
// import { Appearance } from 'react-native'

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import themes from './src/themes';
import {useColorScheme, StatusBar} from 'react-native';
import {ThemeProvider} from './src/context/ThemeProvider';
import TabNavigation from './src/navigation/TabNavigation';

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
