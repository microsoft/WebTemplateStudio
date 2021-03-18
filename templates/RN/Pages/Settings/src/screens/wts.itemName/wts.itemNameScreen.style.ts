import {Platform, StyleSheet} from 'react-native';

import {appStyles,theme} from '../../app.styles';

export const getStyles = () =>
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
      color: '#007aff',
    },
    picker: {
      height: 30,
      width: 200,
      ...Platform.select({
        android: {
          backgroundColor: theme.colors.border,
          color: theme.colors.text,
        },
      }),
    },
  });
