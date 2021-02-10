import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
  },
  sectionLeft: {
    paddingVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  text: {
    fontSize: 14,
  },
  link: {
    textDecorationLine: 'underline',
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
});
