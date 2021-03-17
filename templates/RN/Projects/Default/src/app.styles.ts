import {StyleSheet} from 'react-native';

export const FONTSIZE = {
  XXLARGE: 26,
  XLARGE: 22,
  LARGE: 18,
  MEDIUM: 16,
  SMALL: 14,
};

export default StyleSheet.create({
  title_xxlarge: {
    fontSize: FONTSIZE.XXLARGE,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  title: {
    fontSize: FONTSIZE.LARGE,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: FONTSIZE.MEDIUM,
    color: 'black',
  },
  text: {
    fontSize: FONTSIZE.SMALL,
    color: 'black',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  icon: {
    fontSize: FONTSIZE.XLARGE,
    fontWeight: 'bold',
    padding: 10,
  },
});
