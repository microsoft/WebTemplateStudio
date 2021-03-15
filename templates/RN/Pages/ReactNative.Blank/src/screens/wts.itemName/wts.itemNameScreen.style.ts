import {StyleSheet} from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f2f2f2',
    },
    text: {
      ...appStyles.text,
      color: '#1c1c1e',
    },
  });