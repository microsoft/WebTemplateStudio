import React, { useState } from "react";
import { View, StyleSheet, FlatList, useWindowDimensions, Platform } from "react-native";
import sampleData from "../../data/sampleData";
import ItemDetail from "./ItemDetail";
import ListItem from "./ListItem";

function MasterDetail({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const { width, height } = useWindowDimensions();
  const isWindowsPlatform = width > height;

  const handleOnPress = (item) => {
    setSelectedItem(item);
    if (!isWindowsPlatform) {
      navigation.navigate("Detail", { item });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={sampleData.textAssets}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={() => handleOnPress(item)}
              isSelected={selectedItem && selectedItem.id === item.id}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {isWindowsPlatform && (
        <View style={styles.itemDetailContainer}>
          <ItemDetail item={selectedItem} />
        </View>
      )}
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
    borderLeftColor: "#cdcdcd",
    borderLeftWidth: 1,
  },

  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#cdcdcd",
  },
});

export default MasterDetail;
