import React from "react";
import { Text, SafeAreaView, StyleSheet, Image, Platform } from "react-native";

import useThemeContext from "../../hooks/useThemeContext";
import themes from "../../themes";

function ItemDetail({ item }) {
  const { theme } = useThemeContext();
  const selectedTheme = themes[theme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: selectedTheme.colors.card }]}>
      {item && (
        <SafeAreaView>
          {/* 
          TODO HERE: 
          investigate again styled components to support theme
          improve styling here a bit
           */}
          <Text style={{color:selectedTheme.colors.text}}>Title: {item.title}</Text>
          <Text style={{color:selectedTheme.colors.text}}>Short Description: {item.shortDescription}</Text>
          <Image
            style={styles.logo}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />

          <Text style={{color:selectedTheme.colors.text}}>Status: {item.status}</Text>
          <Text style={{color:selectedTheme.colors.text}}>Ship To: {item.shipTo}</Text>
          <Text style={{color:selectedTheme.colors.text}}>order Total: {item.orderTotal}</Text>
          <Text style={{color:selectedTheme.colors.text}}>order Date: {item.orderDate}</Text>
          <Text style={{color:selectedTheme.colors.text}}>Image Src: {item.imageSrc}</Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 30,
    margin: 10,
  },
});

export default ItemDetail;
