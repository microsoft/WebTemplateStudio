import React from 'react';

import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const PickTheme = () => {
  return (
    <View>
      <Text
        accessibilityLabel="Dark theme"
        aria-accessibilityLabel="Dark theme">
        Pick Theme
      </Text>
      <Picker style={{height: 50, width: 100}}>
        <Picker.Item label="Light" value="Light" />
        <Picker.Item label="Dark" value="Dark" />
        <Picker.Item label="Device Theme" value="Device Theme" />
      </Picker>
    </View>
  );
};

export default PickTheme;
