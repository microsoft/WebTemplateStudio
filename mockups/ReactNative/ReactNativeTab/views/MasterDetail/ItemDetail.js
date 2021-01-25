import React from "react";
import { Text, SafeAreaView, StyleSheet, Image, Platform } from "react-native";
import { SvgUri } from "react-native-svg";

const EMPTY_IMAGE = "https://www.svgrepo.com/download/55002/book.svg";

function ItemDetail({ item }) {
  return (
    <SafeAreaView style={styles.container}>
      {item && (
        <SafeAreaView>
          <Text>Title: {item.title}</Text>
          <Text>Short Description: {item.shortDescription}</Text>
          <Image
            style={styles.logo}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />

          <Text>Status: {item.status}</Text>
          <Text>Ship To: {item.shipTo}</Text>
          <Text>order Total: {item.orderTotal}</Text>
          <Text>order Date: {item.orderDate}</Text>
          <Text>Image Src: {item.imageSrc}</Text>
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
