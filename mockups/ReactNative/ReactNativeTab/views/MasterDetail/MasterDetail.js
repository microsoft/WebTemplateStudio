import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, useWindowDimensions, Platform } from "react-native";
import sampleData from "../../data/sampleData";
import ItemDetailComponent from "./ItemDetailComponent";
import MasterListItem from "./MasterListItem";

function MasterDetail({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const isWindowsPlatform = Platform.OS === "windows";

  const handleOnPress = (item) => {
    setSelectedItem(item);
    if (!isWindowsPlatform) {
      navigation.navigate("ItemDetailScreen", { item });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={sampleData.textAssets}
          renderItem={({ item }) => <MasterListItem item={item} onPress={() => handleOnPress(item)} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      {isWindowsPlatform &&
        <View style={styles.itemDetailContainer}>
          <ItemDetailComponent item={selectedItem} />
        </View>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  listContainer: {
    flex: 1,
  },

  itemDetailContainer: {
    flex: 2.5,
  },
});

export default MasterDetail;
