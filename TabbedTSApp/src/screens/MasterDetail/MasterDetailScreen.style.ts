import {StyleSheet} from 'react-native';
import {Theme} from '../../themes/Theme.interface';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    masterDetailContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.color.background,
    },
    listContainer: {
      flex: 1,
    },
    itemDetailContainer: {
      flex: 2.5,
      borderLeftWidth: 1,
      borderLeftColor: theme.color.border,
      backgroundColor: theme.color.border,
    },
    separator: {
      height: 1,
      width: '100%',
      backgroundColor: theme.color.border,
    },
  });
