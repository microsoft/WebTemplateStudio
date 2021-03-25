import {getStyles} from './DetailScreen.style';
//{[{
import {useTheme} from '../../../context/ThemeContext';
//}]}
const DetailScreen = (props: any): JSX.Element => {
  //{--{
  const styles = React.useMemo(() => getStyles(), []);
  //}--}
  //{[{
  const {theme} = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  //}]}
};

export default DetailScreen;
