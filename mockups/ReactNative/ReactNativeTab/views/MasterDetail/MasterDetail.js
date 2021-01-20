import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import sampleData from "../../data/sampleData";
import MasterListItem from "./MasterListItem";

function MasterDetail({ navigation }) {
  const handleOnPress = (item) => {
    navigation.navigate("MasterDetailItemDetail", { item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData.textAssets}
        renderItem={({ item }) => <MasterListItem item={item} onPress={() => handleOnPress(item)} />}
        keyExtractor={(item) => item.id}
      />
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
