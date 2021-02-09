import { StyleSheet } from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = (theme) =>
  StyleSheet.create({
    ...appStyles,

    text: {
      ...appStyles.text,
      color: theme.colors.text,
    },
    textSelected: {
      ...appStyles.text,
      color: theme.colors.primary,
    },
    title: {
      ...appStyles.title,
      paddingBottom: 5,
      color: theme.colors.text,
    },
    titleSelected: {
      ...appStyles.title,
      paddingBottom: 5,
      color: theme.colors.primary,
    },
    icon: {
      ...appStyles.icon,
      color: theme.colors.text,
    },
    iconSelected: {
      ...appStyles.icon,
      color: theme.colors.primary,
    },

    listItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 10,
    },
    listItemContainerNotSelected: {
      backgroundColor: theme.colors.background,
    },
    listItemContainerSelected: {
      backgroundColor: theme.colors.border,
    },
  });
