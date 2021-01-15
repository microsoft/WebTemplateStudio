import React, { Component } from "react";
import { Text, Button, View, StyleSheet } from "react-native";

export const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={()=>navigation.openDrawer()} title="Open Drawer" />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});
