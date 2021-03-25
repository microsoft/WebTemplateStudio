import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {getStyles} from './ListItemScreen.style';
import {useTheme} from '../../../context/ThemeContext';

export interface IProps {
  item: any;
  onPress: any;
  isSelected: boolean;
}

const ListItemScreen = ({item, onPress, isSelected}: IProps) => {
  const {title, status} = item;
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.listItemContainer,
          isSelected
            ? styles.listItemContainerSelected
            : styles.listItemContainerNotSelected,
        ]}>
        <Icon
          name={item.icon}
          style={isSelected ? styles.iconSelected : styles.icon}
        />
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
};

export default ListItemScreen;
