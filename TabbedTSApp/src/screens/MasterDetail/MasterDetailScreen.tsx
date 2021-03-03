import React, {useState} from 'react';
import {View, FlatList, useWindowDimensions} from 'react-native';

import sampleData from '../../data/sampleData';
import ItemDetailScreen from './ItemDetail/ItemDetailScreen';
import ListItemScreen from './ListItem/ListItemScreen';

import {getStyles} from './MasterDetailScreen.style';

export interface IProps {
  navigation: any;
}

const MasterDetailScreen = ({navigation}: IProps): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {width} = useWindowDimensions();
  const COMPACT_MODE_WIDTH = 700;
  const isCompactMode = width < COMPACT_MODE_WIDTH;

  const styles = getStyles();

  const handleOnPress = (item: any) => {
    setSelectedItem(item);
    if (isCompactMode) {
      navigation.navigate('MasterDetailDetail', {item});
    }
  };

  const isSelected = (item: any): boolean => {
    return selectedItem && selectedItem.id === item.id;
  };

  return (
    <View style={styles.masterDetailContainer}>
      {/* MASTER DETAIL LIST */}
      <View style={styles.listContainer}>
        <FlatList
          data={sampleData.companies}
          renderItem={({item}) => (
            <ListItemScreen
              item={item}
              onPress={() => handleOnPress(item)}
              isSelected={isSelected(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* MASTER DETAIL DETAIL */}
      {!isCompactMode && (
        <View style={styles.itemDetailContainer}>
          <ItemDetailScreen item={selectedItem} />
        </View>
      )}
    </View>
  );
};

export default MasterDetailScreen;
