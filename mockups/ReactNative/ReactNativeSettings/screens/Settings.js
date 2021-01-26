import React from "react";

import { Text, View, StyleSheet, Linking } from "react-native";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

import ToggleTheme from "../components/ToggleTheme";
import useThemeContext from "../hooks/useThemeContext";
import { name, version } from '../package.json';


const goToPrivacyStatementLink = () => {
  Linking.openURL('http://yourprivacystatementurlhere.com');
};
const goToTermsAndConditions = () => {
  Linking.openURL('http://yourtermsandconditionsurlhere.com');
};

export const Settings = () => {
  const { theme } = useThemeContext();
  const selectedTheme = theme === "light" ? NavigationDefaultTheme : NavigationDarkTheme;

  return (
    <View style={[styles.container, { height: "100%", backgroundColor: selectedTheme.colors.background }]}>
      <View style={[styles.section, { backgroundColor: selectedTheme.colors.background }]}>
        <Text style={[styles.title, { color: selectedTheme.colors.text }]}>Personalization</Text>
        <ToggleTheme />
      </View>
      <View style={styles.separator} />
      <View style={[styles.section, { backgroundColor: selectedTheme.colors.background }]}>
        <Text style={[styles.title, { color: selectedTheme.colors.text }]}>About this Application</Text>
        <Text style={[styles.body, { color: selectedTheme.colors.text }]}>{name} - {version}</Text>
        <Text style={[styles.body, { color: selectedTheme.colors.text }]}>Placeholder text: Your app description goes here</Text>
      </View>
      <View style={[styles.section, { backgroundColor: selectedTheme.colors.background }]}>
        <Text style={[styles.body, { color: selectedTheme.colors.primary }]} onPress={() => goToPrivacyStatementLink()}>Privacy Statement</Text>
        <Text style={[styles.body, { color: selectedTheme.colors.primary }]} onPress={() => goToTermsAndConditions()}>Terms and Conditions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingLeft: 15,
    paddingTop: 15,
  },
  section: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  body: {
    fontSize: 15,
  },
});
