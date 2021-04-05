import {StyleSheet} from 'react-native';

import {Theme} from '../../../themes/types';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
