import React from 'react';
import { Text, View } from 'react-native';

import useThemeContext from '../../hooks/useThemeContext';

import { getStyles } from './Home.style';

const Home = () => {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <View style={styles.contentCenter}>
      <Text style={styles.text} accessibilityLabel="Home">
        Home
      </Text>
    </View>
  );
};

export default Home;
