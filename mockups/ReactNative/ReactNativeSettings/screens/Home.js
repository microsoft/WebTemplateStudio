import React from "react";

import { Text, View, StyleSheet } from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

import useThemeContext from "../hooks/useThemeContext";

export const Home = () => {
  const { theme } = useThemeContext();
  const selectedTheme = theme === "light" ? DefaultTheme : DarkTheme;

  return (
    <View style={[ styles.container, { backgroundColor: selectedTheme.colors.background}]}>
      <Text style={{ color: selectedTheme.colors.text }}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});

