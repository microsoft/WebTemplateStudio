import React from "react";
import { View, StyleSheet } from "react-native";

import ItemDetail from "./ItemDetail";

function Detail(props) {
  const { item } = props.route.params;
  return (
    <View style={styles.container}>
      <ItemDetail item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Detail;
