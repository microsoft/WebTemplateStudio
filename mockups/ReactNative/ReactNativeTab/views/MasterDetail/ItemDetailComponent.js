import React from "react";
import { Text, View, StyleSheet } from "react-native";

function ItemDetailComponent({item}) {
  return (
    <View style={styles.container}>
    {item && <Text>Item Detail: {item.title}</Text>}
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

export default ItemDetailComponent;
