import React, { useState } from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';

import sampleData from '../../data/sampleData';
import useThemeContext from '../../hooks/useThemeContext';
import ItemDetail from './ItemDetail/ItemDetail';
import ListItem from './ListItem/ListItem';

import { getStyles } from './MasterDetail.style';

function MasterDetail({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const { width } = useWindowDimensions();
  const COMPACT_MODE_WIDTH = 700;
  const isCompactMode = width < COMPACT_MODE_WIDTH;

  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  const handleOnPress = (item) => {
    setSelectedItem(item);
    if (isCompactMode) {
      navigation.navigate('MasterDetailDetail', { item });
    }
  };

  return (
    <View style={styles.masterDetailContainer}>
      {/* MASTER DETAIL LIST */}
      <View style={styles.listContainer}>
        <FlatList
          data={sampleData.companies}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={() => handleOnPress(item)}
              isSelected={selectedItem && selectedItem.id === item.id}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* MASTER DETAIL DETAIL */}
      {!isCompactMode && (
        <View style={styles.itemDetailContainer }>
          <ItemDetail item={selectedItem} />
        </View>
      )}
    </View>
  );
}

export default MasterDetail;
