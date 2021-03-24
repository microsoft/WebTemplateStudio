import {StyleSheet} from 'react-native';

import {theme} from '../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
    },
    listContainer: {
      flex: 1,
    },
    itemDetailContainer: {
      flex: 2.5,
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.border,
      backgroundColor: theme.colors.border,
    },
    separator: {
      height: 1,
      width: '100%',
      backgroundColor: theme.colors.border,
    },
  });
