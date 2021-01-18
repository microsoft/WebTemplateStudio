import React from "react"
import { View, Button, StyleSheet } from "react-native";
import { Context } from "../context/ThemeProvider"

function ThemeSwitcher() {
  return (
    <Context.Consumer>
       {({ theme, setTheme }) => (
        <View>
          <Button
            style={styles.button}
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-accessibilityLabel="Change Theme"
            title={theme === "dark" ? "light" : "dark"}
          >
          </Button>
        </View>
      )}
    </Context.Consumer>
  )
}

export default ThemeSwitcher

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    backgroundColor: "red",
  },
  button: {
    backgroundColor: "#00dd00",
  },
});

