import React from 'react';

import { Text, View, StyleSheet, Linking } from 'react-native';

import ToggleTheme from '../components/ToggleTheme';
import useThemeContext from '../hooks/useThemeContext';
import { name, version } from '../../package.json';

const goToPrivacyStatementLink = () => {
  Linking.openURL('http://yourprivacystatementurlhere.com');
};
const goToTermsAndConditions = () => {
  Linking.openURL('http://yourtermsandconditionsurlhere.com');
};

const Settings = () => {
  const { theme } = useThemeContext();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}>
      <View
        style={[
          styles.section,
          { backgroundColor: theme.colors.background },
        ]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Personalization
        </Text>
        <ToggleTheme />
      </View>
      <View
        style={[
          styles.section,
          { backgroundColor: theme.colors.background },
        ]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          About this Application
        </Text>
        <Text style={{ color: theme.colors.text }}>
          {name} - {version}
        </Text>
        <Text style={{ color: theme.colors.text }}>
          Placeholder text: Your app description goes here
        </Text>
      </View>
      <View
        style={[
          styles.section,
          { backgroundColor: theme.colors.background },
        ]}>
        <Text
          style={[styles.link, { color: theme.colors.primary }]}
          onPress={goToPrivacyStatementLink}>
          Privacy Statement
        </Text>
        <Text
          style={[styles.link, { color: theme.colors.primary }]}
          onPress={goToTermsAndConditions}>
          Terms and Conditions
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    fontSize: 14,
  },
  section: {
    paddingVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default Settings;
