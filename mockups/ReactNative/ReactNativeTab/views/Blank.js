import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export class Blank extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Blank</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});
