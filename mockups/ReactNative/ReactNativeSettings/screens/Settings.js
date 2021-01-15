import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { name, version } from '../package.json';

const onPressPrivacyStatementLink = () => {
  Linking.openURL('http://yourprivacystatementurlhere.com');
};

export const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Personalization</Text>
        <Text style={styles.body}>Choose Theme</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>About this Application</Text>
        <Text style={styles.body}>{name} - {version}</Text>
        <Text style={styles.body}>Placeholder text: Your app description goes here</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.body, styles.link]} onPress={() => onPressPrivacyStatementLink()}>Privacy Statement</Text>
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
    // backgroundColor: "#ffddFF",
    //TODO: delete. just for dev purposes
  },
  section: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // backgroundColor: "#ffddFF",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    // backgroundColor: "#00ddFF",
  },
  body: {
    fontSize: 15,
    // backgroundColor: "#ff00FF",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    // backgroundColor: "#ffdd00",
  },
});
