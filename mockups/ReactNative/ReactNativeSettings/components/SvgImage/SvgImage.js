import React from "react";
import { Image, StyleSheet, Platform } from "react-native";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

import { SvgUri } from "react-native-svg";

import useThemeContext from "../../hooks/useThemeContext";

const SvgImage = ({ style, uri }) => {

  const { theme } = useThemeContext();
  const selectedTheme = theme === "light" ? NavigationDefaultTheme : NavigationDarkTheme;

  //TODO HERE: theme support here
  if (Platform.OS === "windows") {
    return <Image style={style} source={{ uri }} />;
  }
  return <SvgUri style={[style, {tintColor:"red"}]} uri={uri} />;
};

const styles = StyleSheet.create({});

export default SvgImage;
