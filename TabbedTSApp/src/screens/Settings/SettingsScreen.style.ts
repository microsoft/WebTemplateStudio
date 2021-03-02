import {StyleSheet} from 'react-native';

import appStyles from '../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft: 15,
    },
    section: {
      paddingVertical: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    title: {
      ...appStyles.title,
    },
    text: {
      ...appStyles.text,
    },
    link: {
      ...appStyles.link,
    },
  });
