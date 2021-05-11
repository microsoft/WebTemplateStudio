import {getScreenOptions} from './navigation.options';
//{[{
import {useTheme} from '../context/ThemeContext';
//}]}
const wts.ItemNameStack = (): JSX.Element => {
  //{[{
  const {theme} = useTheme();
  //}]}
  const screenOptions = getScreenOptions(/*{[{*/theme/*}]}*/);
};
