import {getStyles} from './ListItemScreen.style';
//{[{
import {useTheme} from '../../../context/ThemeContext';
//}]}
const ListItemScreen = ({item, onPress, isSelected}: IProps) => {
  //{--{
  const styles = React.useMemo(() => getStyles(), []);
  //}--}
  //{[{
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  //}]}
};