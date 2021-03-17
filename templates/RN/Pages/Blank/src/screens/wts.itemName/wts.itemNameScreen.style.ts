import {StyleSheet} from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightgrey',
    },
    text: {
      ...appStyles.text,
      color: 'black',
    },
  });