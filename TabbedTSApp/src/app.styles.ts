import {StyleSheet} from 'react-native';

export const FONTSIZE = {
  XXLARGE: 26,
  XLARGE: 22,
  LARGE: 18,
  MEDIUM: 16,
  SMALL: 14,
};

export const appStyles = StyleSheet.create({
  title_xxlarge: {
    fontSize: FONTSIZE.XXLARGE,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  title: {
    fontSize: FONTSIZE.LARGE,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: FONTSIZE.MEDIUM,
  },
  text: {
    fontSize: FONTSIZE.SMALL,
  },
  link: {
    textDecorationLine: 'underline',
  },
  icon: {
    fontSize: FONTSIZE.XLARGE,
    fontWeight: 'bold',
    padding: 10,
  },
});
