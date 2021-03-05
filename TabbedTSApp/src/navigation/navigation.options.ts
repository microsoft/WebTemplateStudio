import {Theme} from '../themes/Theme.interface';

export const getTabBarOptions = (theme: Theme) => ({
  activeTintColor: theme.color.primary,
  inactiveTintColor: theme.color.text,
  activeBackgroundColor: theme.color.background,
  inactiveBackgroundColor: theme.color.background,
  style: {
    backgroundColor: theme.color.border,
    borderTopWidth: 1,
    borderTopColor: theme.color.border,
  },
});

export const getScreenOptions = (theme: Theme) => ({
  headerStyle: {
    backgroundColor: theme.color.background,
  },
  headerTintColor: theme.color.text,
});
