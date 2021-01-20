import React from "react";
import { View, StyleSheet } from "react-native";
import sampleData from "../../data/sampleData";
import MasterList from "./MasterList";

function MasterDetail() {
  return (
    <View style={styles.container}>
      <MasterList data={sampleData.textAssets}></MasterList>
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

export default MasterDetail;
