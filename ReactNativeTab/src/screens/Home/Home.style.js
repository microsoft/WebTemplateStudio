import { StyleSheet } from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      ...appStyles.text,
      color: theme.colors.text,
    },
  });
