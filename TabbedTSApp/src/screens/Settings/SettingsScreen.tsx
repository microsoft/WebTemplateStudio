import React from 'react';

import {Text, View, Linking, Button} from 'react-native';

import {name, version} from '../../../package.json';
import {Picker} from '@react-native-picker/picker';
import {getStyles} from './SettingsScreen.style';
import {useTheme} from '../../context/Theme.context';
import {ThemeName} from '../../themes/Theme.interface';

const goToPrivacyStatementLink = () => {
  Linking.openURL('http://yourprivacystatementurlhere.com');
};
const goToTermsAndConditions = () => {
  Linking.openURL('http://yourtermsandconditionsurlhere.com');
};

const Settings = (): JSX.Element => {
  const {theme, themeName, setTheme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Personalization</Text>
        <Text style={styles.text}>Select theme</Text>
        <Picker
          style={styles.picker}
          selectedValue={themeName}
          onValueChange={(itemValue) => setTheme(itemValue)}>
          <Picker.Item label="Default" value={ThemeName.default} />
          <Picker.Item label="Light" value={ThemeName.light} />
          <Picker.Item label="Dark" value={ThemeName.dark} />
        </Picker>
        <Button
          onPress={() => setTheme(ThemeName.default)}
          title="Set default theme"
        />
        <Button
          onPress={() => setTheme(ThemeName.light)}
          title="Set light theme"
        />
        <Button
          onPress={() => setTheme(ThemeName.dark)}
          title="Set dark theme"
        />
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
