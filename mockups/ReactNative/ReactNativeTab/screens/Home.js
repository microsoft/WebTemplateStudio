import React from "react";

import { Text, View, StyleSheet } from "react-native";

import useThemeContext from "../hooks/useThemeContext";
import themes from "../themes";

const Home = () => {
  const { theme } = useThemeContext();
  const selectedTheme = themes[theme];

  return (
    <View style={[styles.container, { backgroundColor: selectedTheme.colors.background }]}>
      <Text style={{ color: selectedTheme.colors.text }} accessibilityLabel="Home" >Home</Text>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});

