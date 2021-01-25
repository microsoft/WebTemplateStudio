import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import SvgImage from "../../components/SvgImage/SvgImage";

function ListItem({ item, onPress, isSelected }) {
  const { title } = item;
  const itemImage = item.imageSrc || "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={isSelected ? styles.selectedContainer : styles.container}>
        <SvgImage style={styles.logo} uri={itemImage} />
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
    margin: 10,
  },
});

export default ListItem;
