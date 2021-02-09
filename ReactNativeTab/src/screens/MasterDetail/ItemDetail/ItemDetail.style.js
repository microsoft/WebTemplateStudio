import { StyleSheet } from 'react-native';

import appStyles from '../../../app.styles';

export const getStyles = (theme) =>
  StyleSheet.create({
    ...appStyles,

    scrollView: {
      marginHorizontal: 10,
      paddingBottom: 10,
      backgroundColor: theme.colors.background,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingLeft: 15,
      backgroundColor: theme.colors.background,
    },
    section: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    icon: {
      ...appStyles.icon,
      fontSize: 28,
      paddingRight: 5,
      color: theme.colors.text,
    },
    title: {
      ...appStyles.title,
      fontSize: 26,
      color: theme.colors.text,
    },
    subtitle: {
      ...appStyles.subtitle,
      color: theme.colors.text,
    },
    description: {
      ...appStyles.text,
      paddingBottom: 16,
      opacity: 0.7,
      color: theme.colors.text,
    },
    text: {
      ...appStyles.text,
      color: theme.colors.text,
    },
  });
