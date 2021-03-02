import React from 'react';
import {Text, View} from 'react-native';

import {getStyles} from './HomeScreen.style';

const Home = () : JSX.Element => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;
