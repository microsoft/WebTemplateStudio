import {theme} from '../app.styles';

export const getTabBarOptions = () : any => ({
  activeTintColor: '#007aff',
  inactiveTintColor: theme.colors.text,
  activeBackgroundColor: theme.background,
  inactiveBackgroundColor: theme.background,
  style: {
    backgroundColor: theme.colors.border,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

export const getScreenOptions = () : any => ({
  headerStyle: {
    backgroundColor: theme.background,
  },
  headerTintColor: theme.colors.text,
});
