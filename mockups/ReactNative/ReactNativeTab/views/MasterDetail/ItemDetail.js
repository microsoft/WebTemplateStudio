import React from "react";
import { Text, View, StyleSheet } from "react-native";

function ItemDetail(props) {
  const { item } = props.route.params;
  return (
    <View style={styles.container}>
      <Text>Item Detail: {item.title}</Text>
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

export default ItemDetail;
