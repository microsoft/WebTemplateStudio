import { StyleSheet } from 'react-native';
import appStyles from '../../app.styles';

export const getHomeStyles = (theme) => StyleSheet.create({
  container:
  {
    ...appStyles.container,
    backgroundColor: theme.colors.background
  },
  text: {
    color: theme.colors.text,
  }
});