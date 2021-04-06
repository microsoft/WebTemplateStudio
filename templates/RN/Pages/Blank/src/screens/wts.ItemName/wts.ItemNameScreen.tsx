﻿import React from 'react';
import {Text, View} from 'react-native';

import {getStyles} from './wts.ItemNameScreen.style';

const wts.ItemNameScreen = (): JSX.Element => {
  const styles = React.useMemo(() => getStyles(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>wts.ItemNameScreen</Text>
    </View>
  );
};

export default wts.ItemNameScreen;