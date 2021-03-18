import React from 'react';
import {View} from 'react-native';

import ItemDetailScreen from '../ItemDetail/ItemDetailScreen';
import {getStyles} from './DetailScreen.style';

const DetailScreen = (props: any): JSX.Element => {
  const {item} = props.route.params;

  const styles = React.useMemo(() => getStyles(), []);

  return (
    <View style={styles.container}>
      <ItemDetailScreen item={item} />
    </View>
  );
};

export default DetailScreen;
