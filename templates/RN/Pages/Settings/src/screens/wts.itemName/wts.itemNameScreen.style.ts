import {Platform, StyleSheet} from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft: 15,
      backgroundColor: '#f2f2f2',
    },
    section: {
      paddingVertical: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: '#f2f2f2',
    },
    title: {
      ...appStyles.title,
      color: '#1c1c1e',
    },
    text: {
      ...appStyles.text,
      color: '#1c1c1e',
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
          backgroundColor: '#d8d8d8',
          color: '#1c1c1e',
        },
      }),
    },
  });
