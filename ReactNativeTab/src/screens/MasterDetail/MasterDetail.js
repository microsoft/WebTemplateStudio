import React, { useState } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';

import sampleData from '../../data/sampleData';
import useThemeContext from '../../hooks/useThemeContext';
import ItemDetail from './ItemDetail';
import ListItem from './ListItem';

function MasterDetail({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const { width } = useWindowDimensions();
  const COMPACT_MODE_WIDTH = 700;
  const isCompactMode = width < COMPACT_MODE_WIDTH;
  const { theme } = useThemeContext();

  const handleOnPress = (item) => {
    setSelectedItem(item);
    if (isCompactMode) {
      navigation.navigate('MasterDetailDetail', { item });
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}>
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
        <View style={styles.itemDetailContainer}>
          <ItemDetail item={selectedItem} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
  },
  itemDetailContainer: {
    flex: 2.5,
    borderLeftWidth: 1,
    borderLeftColor: '#cdcdcd', //TODO remove hardcoded color and use theme instead
    backgroundColor: '#cdcdcd',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#cdcdcd',
  },
});

export default MasterDetail;
