import React from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import MasterListItem from "./MasterListItem";

function MasterList({ data }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <MasterListItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MasterList;
