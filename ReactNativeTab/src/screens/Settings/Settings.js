import React from 'react';

import { Text, View, Linking } from 'react-native';

import ToggleTheme from './ToogleTheme/ToggleTheme';
import useThemeContext from '../../hooks/useThemeContext';
import { name, version } from '../../../package.json';
import { getStyles } from './Settings.style';

const goToPrivacyStatementLink = () => {
  Linking.openURL('http://yourprivacystatementurlhere.com');
};
const goToTermsAndConditions = () => {
  Linking.openURL('http://yourtermsandconditionsurlhere.com');
};

const Settings = () => {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Personalization</Text>
        <ToggleTheme />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>About this Application</Text>
        <Text style={styles.text}>
          {name} - {version}
        </Text>
        <Text style={styles.text}>
          Placeholder text: Your app description goes here
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.link} onPress={goToPrivacyStatementLink}>
          Privacy Statement
        </Text>
        <Text style={styles.link} onPress={goToTermsAndConditions}>
          Terms and Conditions
        </Text>
      </View>
    </View>
  );
};

export default Settings;
