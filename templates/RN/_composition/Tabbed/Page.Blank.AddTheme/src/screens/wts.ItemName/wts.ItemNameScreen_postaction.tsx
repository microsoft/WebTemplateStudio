import {getStyles} from './wts.ItemNameScreen.style';
//{[{
import {useTheme} from '../../context/ThemeContext';
//}]}
const wts.ItemNameScreen = (): JSX.Element => {
  //{--{
  const styles = React.useMemo(() => getStyles(), []);
  //}--}
  //{[{
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  //}]}
};