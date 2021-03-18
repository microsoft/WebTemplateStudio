import {StyleSheet} from 'react-native';

import {theme} from '../../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
