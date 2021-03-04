import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import TabNavigation from './navigation/TabNavigation';

// We choose the default light theme for the initial theme
// If we want dark theme as the initial theme, we just import that
import {DEFAULT_LIGHT_THEME} from './themes/DefaultLight.theme';
import {ThemeProvider} from './context/Theme.context';

function App(): JSX.Element {
  return (
    <ThemeProvider initial={DEFAULT_LIGHT_THEME}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
