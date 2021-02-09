import { StyleSheet } from 'react-native';

import appStyles from '../../../app.styles';

export const getStyles = (theme) =>
  StyleSheet.create({
    ...appStyles,

    containerFlex: {
      flex: 1,
    },
  });
