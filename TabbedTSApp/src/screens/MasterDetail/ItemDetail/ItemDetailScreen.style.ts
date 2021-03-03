import {StyleSheet} from 'react-native';

import appStyles, {FONTSIZE} from '../../../app.styles';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingLeft: 15,
      backgroundColor: 'lightgrey',
    },
    scrollView: {
      marginHorizontal: 10,
      paddingBottom: 10,
      backgroundColor: 'lightgrey',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    section: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    icon: {
      ...appStyles.icon,
      fontSize: FONTSIZE.XXLARGE,
      paddingRight: 5,
      color: 'black',
    },
    title: {
      ...appStyles.title,
      fontSize: FONTSIZE.XXLARGE,
      color: 'black',
    },
    subtitle: {
      ...appStyles.subtitle,
      color: 'black',
    },
    description: {
      ...appStyles.text,
      paddingBottom: 16,
      opacity: 0.7,
      color: 'black',
    },
    text: {
      ...appStyles.text,
      color: 'black',
    },
  });
