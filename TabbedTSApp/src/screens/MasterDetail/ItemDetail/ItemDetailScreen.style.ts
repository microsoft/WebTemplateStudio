import {StyleSheet} from 'react-native';

import appStyles, {FONTSIZE} from '../../../app.styles';
import {Theme} from '../../../themes/Theme.interface';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingLeft: 15,
      backgroundColor: theme.color.background,
    },
    scrollView: {
      marginHorizontal: 10,
      paddingBottom: 10,
      backgroundColor: theme.color.background,
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
      color: theme.color.text,
    },
    title: {
      ...appStyles.title,
      fontSize: FONTSIZE.XXLARGE,
      color: theme.color.text,
    },
    subtitle: {
      ...appStyles.subtitle,
      color: theme.color.text,
    },
    description: {
      ...appStyles.text,
      paddingBottom: 16,
      opacity: 0.7,
      color: theme.color.text,
    },
    text: {
      ...appStyles.text,
      color: theme.color.text,
    },
  });
