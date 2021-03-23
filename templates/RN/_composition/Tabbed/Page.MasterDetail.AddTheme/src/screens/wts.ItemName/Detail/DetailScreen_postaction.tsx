import React from 'react';
import {View} from 'react-native';
//{[{
import {useTheme} from '../../../context/ThemeContext';
//}]}
const DetailScreen = (props: any): JSX.Element => {
  //{--{
  const styles = React.useMemo(() => getStyles(), []);
  //}--}
  //{[{
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [[theme]]);
  //}]}
};

export default DetailScreen;
