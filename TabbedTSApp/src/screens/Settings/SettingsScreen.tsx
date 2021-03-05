import React from 'react';

import {Text, View, Linking, Button} from 'react-native';

import {name, version} from '../../../package.json';
//import PickTheme from './PickTheme/PickTheme';
import {getStyles} from './SettingsScreen.style';
import {useTheme} from '../../context/Theme.context';
import {DEFAULT_DARK_THEME_ID} from '../../themes/DefaultDark.theme';
import {DEFAULT_LIGHT_THEME_ID} from '../../themes/DefaultLight.theme';

const goToPrivacyStatementLink = () => {
  Linking.openURL('http://yourprivacystatementurlhere.com');
};
const goToTermsAndConditions = () => {
  Linking.openURL('http://yourtermsandconditionsurlhere.com');
};

const Settings = (): JSX.Element => {
  const {theme, setTheme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.section}>
        <Text style={styles.title}>Personalization</Text>
        <PickTheme />
      </View> */}
      <View style={styles.section}>
        <Text style={styles.title}>Select theme</Text>
        <Button
          onPress={() => setTheme(DEFAULT_LIGHT_THEME_ID)}
          title="Set light theme"
        />
        <Button
          onPress={() => setTheme(DEFAULT_DARK_THEME_ID)}
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
