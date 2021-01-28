import React from "react";
import { Image, StyleSheet, Platform } from "react-native";
import { SvgUri } from "react-native-svg";

const SvgImage = ({ style, uri }) => {
  if (Platform.OS === "windows") {
    return <Image style={[style]} source={{ uri }} />;
  }
  return <SvgUri style={[style, styles.imageContainer]} uri={uri} />;
};

const styles = StyleSheet.create({
  
});

export default SvgImage;
