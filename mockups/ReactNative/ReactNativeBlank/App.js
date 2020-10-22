import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" >
          {/* <Header /> */}
          <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Blank</Text>
              <Text style={styles.sectionDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet aliquet rutrum. Quisque imperdiet in nunc porttitor porttitor. Suspendisse auctor eleifend tellus sit amet congue. Proin quis rhoncus elit, ut dapibus leo. Pellentesque nec placerat ipsum, eu malesuada sem. Quisque dictum, massa id venenatis laoreet, magna metus sollicitudin arcu, vel euismod velit quam quis odio. Vestibulum in turpis non est vulputate molestie sed a purus. Vestibulum sapien lorem, aliquam eu sem id, aliquet fermentum lacus. Aenean volutpat tincidunt felis quis tempus. Sed et tristique magna. Integer consequat, nisi a hendrerit elementum, justo purus tempor odio, ac consequat metus turpis egestas diam. Nulla facilisi. Aliquam in urna aliquam velit condimentum bibendum. Nullam sed leo ut erat iaculis pellentesque vel vitae nibh. In mollis mi eget dapibus auctor. Proin turpis velit, cursus at volutpat non, feugiat eget quam.

Proin vitae vulputate urna. Donec a dictum libero, vitae aliquet ex. Vivamus commodo, purus et posuere consequat, mi elit faucibus urna, ut ornare lorem mi sit amet mauris. Aliquam pellentesque massa eu nisi placerat aliquam. Maecenas sed eleifend est, eget consequat mi. Curabitur purus ligula, ornare vel finibus id, imperdiet vitae lorem. Sed et ultrices ligula, in ullamcorper ante. Integer gravida nisi lacus, lacinia sagittis ex lobortis eget.

Curabitur sit amet risus hendrerit, ultricies diam vel, condimentum dolor. Nullam semper nisl in magna faucibus sodales. Aenean nisi nibh, pellentesque sed congue ut, tempus sed tortor. Fusce maximus, purus a commodo mattis, nulla augue convallis quam, dignissim luctus ligula est quis velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam feugiat commodo interdum. Vestibulum eget congue tellus.

Nullam id consectetur sapien. Nunc in dolor pretium, fermentum augue eget, laoreet felis. Quisque efficitur orci commodo malesuada euismod. Aliquam erat volutpat. Duis aliquet ullamcorper fermentum. In sollicitudin tempus neque, non eleifend justo. Mauris pharetra dictum purus et porta. Fusce at velit vitae metus blandit pretium. Etiam vitae lorem semper, auctor arcu eget, aliquet tellus.

Phasellus augue lorem, iaculis in dapibus ac, sollicitudin id quam. Aliquam auctor diam sed turpis pulvinar sollicitudin. Vestibulum et nisi porta lacus sagittis aliquam. Proin a nunc pharetra nunc dignissim sagittis. Nullam scelerisque arcu ut tincidunt blandit. Nunc tincidunt lectus eu gravida semper. Pellentesque aliquam congue posuere. Mauris id justo lacinia, cursus elit at, commodo velit. Ut fermentum purus at efficitur luctus. Sed suscipit dui id augue ultricies, quis lacinia ante faucibus. Nunc non tempus risus. Nulla vitae libero lacus.

Generated 5 paragraphs, 403 words, 2766 bytes of Lorem Ipsum</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    // backgroundColor: '#EEE',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    // TODO TOREMOVE just having a look at some styling. Not needed on the mock up.
    // color: '#F05',
    // backgroundColor: '#F05',//does not work for Text
    
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    // TODO TOREMOVE just having a look at some styling. Not needed on the mock up.
    // color: '#34f034',
  }
});

export default App;
