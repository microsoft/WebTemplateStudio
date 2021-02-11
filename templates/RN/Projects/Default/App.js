//JUST PLAYING WITH TEMPLATE ENGINE
import React from 'react';

//PACKAGE JSON
//NAVIGATION
// "@react-navigation/bottom-tabs": "^5.11.2",
// "@react-navigation/native": "^5.9.2",
// "@react-navigation/stack": "^5.12.8",

//THEME SUPPORT
//"react-native-paper": "^4.7.1",

//END PACKAGE JSON

// import {
//   NavigationContainer,
//   DefaultTheme as NavigationDefaultTheme,
// } from '@react-navigation/native';

// import themes from './src/themes';
import { SafeAreaView } from 'react-native';
// import { useColorScheme, View } from 'react-native';
// import { ThemeProvider } from './src/context/ThemeProvider';
//import TabNavigation from './src/navigation/TabNavigation';

function App() {
  // const deviceTheme = useColorScheme();
  // const theme = themes[deviceTheme] ?? NavigationDefaultTheme;

  return (
    <SafeAreaView>
      <View>
        <Text>
          wts.itemName
        </Text>
      </View>
    </SafeAreaView>
  );
}

{/* <ThemeProvider>
<NavigationContainer theme={theme}>
  <TabNavigation />
</NavigationContainer> 
</ThemeProvider> */}
export default App;
