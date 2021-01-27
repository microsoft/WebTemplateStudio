import React from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import SvgImage from "../../components/SvgImage/SvgImage";
import useThemeContext from "../../hooks/useThemeContext";
import themes from "../../themes";

function ListItem({ item, onPress, isSelected }) {
  const { title } = item;
  const itemImage = item.imageSrc || "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";

  const { theme } = useThemeContext();
  const selectedTheme = themes[theme];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[isSelected ? styles.selectedContainer : styles.container, {backgroundColor: isSelected ? selectedTheme.colors.card : selectedTheme.colors.background}]}>
        <SvgImage style={[styles.logo, { backgroundColor: selectedTheme.colors.backgroundColor}]} uri={itemImage} />
        <Text style={[isSelected ? styles.selectedTitle : styles.title, {color: isSelected ? selectedTheme.colors.primary: selectedTheme.colors.text}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  selectedContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  logo: {
    width: 50,
    height: 50,
    margin: 10,
  },
});

export default ListItem;
