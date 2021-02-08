import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import useThemeContext from '../hooks/useThemeContext';

const Home = () => {
  const { theme } = useThemeContext();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }} accessibilityLabel="Home">
        Home
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
