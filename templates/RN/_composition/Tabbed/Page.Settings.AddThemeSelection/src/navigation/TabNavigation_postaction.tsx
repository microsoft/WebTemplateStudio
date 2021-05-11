import {getTabBarOptions} from './navigation.options';
//{[{
import {useTheme} from '../context/ThemeContext';
//}]}
const TabNavigation = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  //{[{
  const {theme} = useTheme();
  //}]}
  const tabBarOptions = getTabBarOptions(/*{[{*/theme/*}]}*/);
};
