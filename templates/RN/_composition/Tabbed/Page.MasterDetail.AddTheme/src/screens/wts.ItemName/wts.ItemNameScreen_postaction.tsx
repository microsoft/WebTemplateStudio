import {View, FlatList, useWindowDimensions} from 'react-native';
//{[{
import {useTheme} from '../../context/ThemeContext';
//}]}
const wts.ItemNameScreen = ({navigation}: IProps): JSX.Element => {
  //{--{
  const styles = React.useMemo(() => getStyles(), []);
  //}--}
  //{[{
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [[theme]]);
  //}]}
};