import React from 'react';
import {View} from 'react-native';

import ItemDetailScreen from '../ItemDetail/ItemDetailScreen';
import {getStyles} from './DetailScreen.style';
import {useTheme} from '../../../context/ThemeContext';

const DetailScreen = (props: any): JSX.Element => {
  const {item} = props.route.params;

  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ItemDetailScreen item={item} />
    </View>
  );
};

export default DetailScreen;
