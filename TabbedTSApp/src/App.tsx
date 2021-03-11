import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import TabNavigation from './navigation/TabNavigation';

import {ThemeProvider, useTheme} from './context/Theme.context';

function App(): JSX.Element {
  const {theme} = useTheme();

  return (
    <ThemeProvider initial={theme}>
      <NavigationContainer theme={theme}>
        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
