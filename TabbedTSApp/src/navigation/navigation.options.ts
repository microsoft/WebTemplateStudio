import {Theme} from '../themes/Theme.interface';

export const getTabBarOptions = (theme: Theme) => ({
  activeTintColor: theme.colors.primary,
  inactiveTintColor: theme.colors.text,
  activeBackgroundColor: theme.colors.background,
  inactiveBackgroundColor: theme.colors.background,
  style: {
    backgroundColor: theme.colors.border,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

export const getScreenOptions = (theme: Theme) => ({
  headerStyle: {
    backgroundColor: theme.colors.background,
  },
  headerTintColor: theme.colors.text,
});
