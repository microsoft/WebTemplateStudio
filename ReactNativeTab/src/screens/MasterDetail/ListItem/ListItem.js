import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import useThemeContext from '../../../hooks/useThemeContext';
import { getStyles } from './ListItem.style';

function ListItem({ item, onPress, isSelected }) {
  const { title, status } = item;
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.listItemContainer, isSelected ? styles.listItemContainerSelected : styles.listItemContainerNotSelected]}>
        <Icon name={item.icon} style={isSelected ? styles.iconSelected : styles.icon} />
        <View>
          <Text style={isSelected ? styles.titleSelected : styles.title}>
            {title}
          </Text>
          <Text style={isSelected ? styles.textSelected : styles.text}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ListItem;
