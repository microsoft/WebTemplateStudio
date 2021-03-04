import {StyleSheet} from 'react-native';

import appStyles from '../../../app.styles';
import {Theme} from '../../../themes/Theme.interface';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      ...appStyles.text,
      color: theme.color.text,
    },
    textSelected: {
      ...appStyles.text,
      color: theme.color.primary,
    },
    title: {
      ...appStyles.title,
      paddingBottom: 5,
      color: theme.color.text,
    },
    titleSelected: {
      ...appStyles.title,
      paddingBottom: 5,
      color: theme.color.primary,
    },
    icon: {
      ...appStyles.icon,
      color: theme.color.text,
    },
    iconSelected: {
      ...appStyles.icon,
      color: theme.color.primary,
    },

    listItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 10,
    },
    listItemContainerNotSelected: {
      backgroundColor: theme.color.background,
    },
    listItemContainerSelected: {
      backgroundColor: theme.color.border,
    },
  });
