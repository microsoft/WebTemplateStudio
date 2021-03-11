import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

import {getStyles} from './HomeScreen.style';

const Home = (): JSX.Element => {
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;
