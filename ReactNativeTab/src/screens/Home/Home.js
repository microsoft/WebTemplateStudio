import React from 'react';
import { Text, View } from 'react-native';

import useThemeContext from '../../hooks/useThemeContext';

import { getHomeStyles } from './Home.style';

const Home = () => {
  const { theme } = useThemeContext();
  const styles = getHomeStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text} accessibilityLabel="Home">
        Home
      </Text>
    </View>
  );
};

export default Home;
