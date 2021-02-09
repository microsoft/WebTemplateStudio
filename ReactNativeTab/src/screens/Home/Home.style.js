import { StyleSheet } from 'react-native';

export const getHomeStyles = (theme) => StyleSheet.create({
  container:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background
  },
  text: {
    color: theme.colors.text,
  }
});