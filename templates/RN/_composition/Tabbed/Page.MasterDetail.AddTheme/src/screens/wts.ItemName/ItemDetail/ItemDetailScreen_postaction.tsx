import {getStyles} from './ItemDetailScreen.style';
//{[{
import {useTheme} from '../../../context/ThemeContext';
//}]}
const ItemDetailScreen = ({item}: IProps): JSX.Element => {
  //{--{
  const styles = React.useMemo(() => getStyles(), []);
  //}--}
  //{[{
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  //}]}
};
