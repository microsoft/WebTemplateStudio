import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ItemDetailComponent from "./ItemDetailComponent";

function ItemDetailScreen(props) {
  const { item } = props.route.params;
  return (
    <View style={styles.container}>
      <ItemDetailComponent item={item} />
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

export default ItemDetailScreen;
