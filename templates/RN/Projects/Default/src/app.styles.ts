import {StyleSheet} from 'react-native';

export const theme = {
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

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
