import {StyleSheet} from 'react-native';

import appStyles from '../../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    text: {
      ...appStyles.text,
      color: 'black',
    },
    textSelected: {
      ...appStyles.text,
      color: 'blue',
    },
    title: {
      ...appStyles.title,
      paddingBottom: 5,
      color: 'black',
    },
    titleSelected: {
      ...appStyles.title,
      paddingBottom: 5,
      color: 'blue',
    },
    icon: {
      ...appStyles.icon,
      color: 'black',
    },
    iconSelected: {
      ...appStyles.icon,
      color: 'blue',
    },

    listItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 10,
    },
    listItemContainerNotSelected: {
      backgroundColor: 'lightgrey',
    },
    listItemContainerSelected: {
      backgroundColor: 'grey',
    },
  });
