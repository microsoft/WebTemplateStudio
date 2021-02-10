import React from 'react';

import { View, Text, Switch } from 'react-native';

import useThemeContext from '../hooks/useThemeContext';
import themes from '../themes';
import { getStyles } from './ToggleTheme.style';

const ToggleTheme = () => {
  const { theme, setTheme } = useThemeContext();
  const styles = getStyles(theme);

  const changeTheme = () => {
    const newTheme = theme.dark ? themes.light : themes.dark;
    setTheme(newTheme);
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.label}
        accessibilityLabel="Dark theme"
        aria-accessibilityLabel="Dark theme">
        Dark theme
      </Text>
      <Switch
        style={styles.switch}
        onValueChange={changeTheme}
        value={theme.dark}
      />
    </View>
  );
};

export default ToggleTheme;
