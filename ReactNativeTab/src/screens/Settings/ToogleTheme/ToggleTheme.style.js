import { StyleSheet } from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      ...appStyles.text,
      color: theme.colors.text,
      marginRight: 20,
    },
  });
