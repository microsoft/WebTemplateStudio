import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import useThemeContext from '../hooks/useThemeContext';
import { useColorScheme } from 'react-native';

const Home = () => {
  const { theme } = useThemeContext();
  const deviceTheme = useColorScheme(); //TODO HERE: TO be removed. Just to check theme works as expected

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }} accessibilityLabel="Home">
        Home {deviceTheme}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
