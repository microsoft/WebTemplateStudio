import React from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import useThemeContext from '../../hooks/useThemeContext';

function ListItem({ item, onPress, isSelected }) {
  const { title, status } = item;
  const { theme } = useThemeContext();
  const textColor = isSelected ? theme.colors.primary : theme.colors.text;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isSelected
              ? theme.colors.border
              : theme.colors.background,
          },
        ]}>
        <Icon color={textColor} name={item.icon} style={styles.icon} />
        <View>
          <Text
            style={[
              styles.title,
              {
                color: textColor,
              },
            ]}>
            {title}
          </Text>
          <Text
            style={{
              color: textColor,
            }}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default ListItem;
