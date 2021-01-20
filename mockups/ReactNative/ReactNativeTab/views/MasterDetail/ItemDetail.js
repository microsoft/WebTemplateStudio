import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export class ItemDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Item Detail</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
