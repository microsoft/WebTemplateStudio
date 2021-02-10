import React from 'react';
import { View } from 'react-native';
import useThemeContext from '../../../hooks/useThemeContext';

import ItemDetail from '../ItemDetail/ItemDetail';
import { getStyles } from './Detail.style';

function Detail(props) {
  const { item } = props.route.params;

  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <ItemDetail item={item} />
    </View>
  );
}

export default Detail;
