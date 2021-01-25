import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

function ListItem({ item, onPress, isSelected }) {
  const { title } = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={isSelected ? styles.selectedContainer : styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <Text style={isSelected ? styles.selectedTitle : styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  selectedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#007bff",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    color: "#000000",
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    color: "#ffffff",
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 30,
    margin: 10,
  },
});

export default ListItem;
