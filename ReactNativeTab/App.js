import React from 'react';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import themes from './src/themes';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from './src/context/ThemeProvider';
import TabNavigation from './src/navigation/TabNavigation';

function App() {
  //TODO HERE can we use context here already?
  //TODO: we should rely just on theme after this.
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme] ?? NavigationDefaultTheme;

  return (
    <ThemeProvider>
      <NavigationContainer theme={theme}>
        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
