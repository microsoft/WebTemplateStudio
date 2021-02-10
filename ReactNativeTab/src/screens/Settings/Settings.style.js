import { StyleSheet } from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft: 15,
      backgroundColor: theme.colors.background,
    },
    section: {
      paddingVertical: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.background,
    },
    title: {
      ...appStyles.title,
      color: theme.colors.text,
    },
    text: {
      ...appStyles.text,
      color: theme.colors.text,
    },
    link: {
      ...appStyles.link,
      color: theme.colors.primary,
    },
  });
