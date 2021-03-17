import {StyleSheet} from 'react-native';

export const getStyles = () =>
  StyleSheet.create({
    masterDetailContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
    },
    listContainer: {
      flex: 1,
    },
    itemDetailContainer: {
      flex: 2.5,
      borderLeftWidth: 1,
      borderLeftColor: '#d8d8d8',
      backgroundColor: '#d8d8d8',
    },
    separator: {
      height: 1,
      width: '100%',
      backgroundColor: '#d8d8d8',
    },
  });
