import React from "react";
import { Text, View, StyleSheet } from "react-native";

function MasterListItem({ item }) {
  const { title } = item;

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MasterListItem;
