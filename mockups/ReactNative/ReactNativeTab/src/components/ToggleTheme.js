import React from 'react';

import {Platform, StyleSheet, View, Button, Text} from 'react-native';
import {TouchableRipple, Switch} from 'react-native-paper';

import useThemeContext from '../hooks/useThemeContext';
import themes from '../themes';

export default function ToggleTheme() {
  const {theme, setTheme} = useThemeContext();
  const selectedTheme = themes[theme];
  const isWindowsPlatform = Platform.OS === 'windows';

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <View>
      {!isWindowsPlatform && (
        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.toggle}>
            <Text
              style={[styles.label, {color: selectedTheme.colors.text}]}
              accessibilityLabel="Dark Mode"
              aria-accessibilityLabel="Dark Mode">
              Dark Theme
            </Text>
            <View pointerEvents="none" style={styles.switch}>
              <Switch
                value={selectedTheme.dark}
                accessibilityLabel="Change Theme"
              />
            </View>
          </View>
        </TouchableRipple>
      )}
      {isWindowsPlatform && (
        <Button
          onPress={toggleTheme}
          accessibilityLabel="Change Theme"
          aria-accessibilityLabel="Change Theme"
          title={theme === 'dark' ? 'Set light theme' : 'Set dark theme'}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    textAlignVertical: 'center',
  },
  switch: {
    textAlignVertical: 'bottom',
  },
});
