import {StyleSheet} from 'react-native';

export const getStyles = () =>
  StyleSheet.create({
    masterDetailContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'lightgrey',
    },
    listContainer: {
      flex: 1,
    },
    itemDetailContainer: {
      flex: 2.5,
      borderLeftWidth: 1,
      borderLeftColor: 'lightgrey',
      backgroundColor: 'lightgrey',
    },
    separator: {
      height: 1,
      width: '100%',
      backgroundColor: 'grey',
    },
  });
