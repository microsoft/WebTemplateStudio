import React from 'react';
import {Text, View, Linking} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {name, version} from '../../../package.json';

import {getStyles} from './SettingsScreen.style';
import {useTheme} from '../../context/ThemeContext';
import {ThemeName} from '../../themes/types';

const goToPrivacyStatementLink = () => {
  Linking.openURL('http://yourprivacystatementurlhere.com');
};
const goToTermsAndConditions = () => {
  Linking.openURL('http://yourtermsandconditionsurlhere.com');
};

const SettingsScreen = (): JSX.Element => {
  const {theme, setTheme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Personalization</Text>
        <Picker
          style={styles.picker}
          selectedValue={theme.name}
          onValueChange={(itemValue: string) => setTheme(itemValue)}>
          <Picker.Item label="Default" value={ThemeName.default} />
          <Picker.Item label="Light" value={ThemeName.light} />
          <Picker.Item label="Dark" value={ThemeName.dark} />
        </Picker>
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

export default SettingsScreen;
