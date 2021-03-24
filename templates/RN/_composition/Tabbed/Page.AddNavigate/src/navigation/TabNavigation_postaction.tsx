//^^
//{[{
import wts.ItemNameStack from './wts.ItemNameStack';
//}]}
import {getTabBarOptions} from './navigation.options';

    <Tab.Navigator
      tabBarOptions={tabBarOptions}>
      //^^
      //{[{
      <Tab.Screen name="wts.ItemName" component={wts.ItemNameStack} />
      //}]}
    </Tab.Navigator>
  );