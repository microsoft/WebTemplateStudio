import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import TabNavigation from './navigation/TabNavigation';

function App() {
  return (
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
  );
}

export default App;
