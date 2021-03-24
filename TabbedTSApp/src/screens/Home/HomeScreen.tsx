import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

import {getStyles} from './HomeScreen.style';

const HomeScreen = (): JSX.Element => {
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
