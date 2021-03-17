import {StyleSheet} from 'react-native';

import appStyles from '../../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    text: {
      ...appStyles.text,
      color: '#1c1c1e',
    },
    textSelected: {
      ...appStyles.text,
      color: '#007aff',
    },
    title: {
      ...appStyles.title,
      paddingBottom: 5,
      color: '#1c1c1e',
    },
    titleSelected: {
      ...appStyles.title,
      paddingBottom: 5,
      color: '#007aff',
    },
    icon: {
      ...appStyles.icon,
      color: '#1c1c1e',
    },
    iconSelected: {
      ...appStyles.icon,
      color: '#007aff',
    },

    listItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 10,
    },
    listItemContainerNotSelected: {
      backgroundColor: '#f2f2f2',
    },
    listItemContainerSelected: {
      backgroundColor: '#d8d8d8',
    },
  });
