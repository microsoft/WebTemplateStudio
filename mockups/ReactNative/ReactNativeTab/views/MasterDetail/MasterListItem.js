import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function MasterListItem({ item, onPress }) {
  const { title } = item;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
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
