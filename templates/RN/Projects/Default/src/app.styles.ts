import {StyleSheet} from 'react-native';

export const theme = {
  colors: {
    primary: '#007aff',
    background: '#f2f2f2',
    card: '#ffffff',
    text: '#1c1c1e',
    border: '#d8d8d8',
    notification: '#ff3b30',
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
