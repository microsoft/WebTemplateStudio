import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { name, version } from '../package.json';

import ThemeSwitcher from "../components/ThemeSwitcher";

const goToPrivacyStatementLink = () => {
  Linking.openURL('http://yourprivacystatementurlhere.com');
};
const goToTermsAndConditions = () => {
  Linking.openURL('http://yourtermsandconditionsurlhere.com');
};

export const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Personalization</Text>
        <ThemeSwitcher />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>About this Application</Text>
        <Text style={styles.body}>{name} - {version}</Text>
        <Text style={styles.body}>Placeholder text: Your app description goes here</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.body, styles.link]} onPress={() => goToPrivacyStatementLink()}>Privacy Statement</Text>
        <Text style={[styles.body, styles.link]} onPress={() => goToTermsAndConditions()}>Terms and Conditions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginLeft: 15,
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
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
