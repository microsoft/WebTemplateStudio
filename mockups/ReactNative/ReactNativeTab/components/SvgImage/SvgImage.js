import React from "react";
import { Image, StyleSheet, Platform } from "react-native";
import { SvgUri } from "react-native-svg";

const SvgImage = ({ style, uri }) => {
  if (Platform.OS === "windows") {
    return <Image style={[style, styles.imageContainer]} source={{ uri }} />;
  }
  return <SvgUri style={[style, styles.imageContainer]} uri={uri} />;
};

const styles = StyleSheet.create({
  imageContainer: {
    //TODO probably don´t specify size here?
    width: 30,
    height: 30,
  },
});

export default SvgImage;
