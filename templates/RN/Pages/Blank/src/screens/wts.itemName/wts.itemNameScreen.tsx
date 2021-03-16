import React from 'react';
import {Text, View} from 'react-native';

import {getStyles} from './wts.itemNameScreen.style';

const wts.itemNameScreen = (): JSX.Element => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>wts.itemNameScreen</Text>
    </View>
  );
};

export default wts.itemNameScreen;