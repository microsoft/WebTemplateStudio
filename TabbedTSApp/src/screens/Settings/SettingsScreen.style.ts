import {StyleSheet} from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft: 15,
      backgroundColor: 'lightgrey',
    },
    section: {
      paddingVertical: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: 'lightgrey',
    },
    title: {
      ...appStyles.title,
      color: 'black',
    },
    text: {
      ...appStyles.text,
      color: 'black',
    },
    link: {
      ...appStyles.link,
      color: 'blue',
    },
  });
