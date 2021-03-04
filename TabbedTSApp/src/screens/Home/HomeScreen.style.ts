import {StyleSheet} from 'react-native';

import appStyles from '../../app.styles';
import {Theme} from '../../themes/Theme.interface';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.color.background,
    },
    text: {
      ...appStyles.text,
      color: theme.color.text,
    },
  });
