import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

import useThemeContext from '../../hooks/useThemeContext';
import themes from '../../themes';

function ItemDetail({ item }) {
  const { theme } = useThemeContext();
  const selectedTheme = themes[theme];

  return (
    (item && 
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: selectedTheme.colors.background },
      ]}>
      <ScrollView contentContainerStyle={{ backgroundColor: selectedTheme.colors.background }}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Text style={[styles.title, { color: selectedTheme.colors.text }]}>
            {item.title}
          </Text>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
        <Text style={[styles.description, { color: selectedTheme.colors.text }]}>
          {item.shortDescription}
        </Text>

        <Text style={[styles.subtitle, { color: selectedTheme.colors.text }]}>
          Status
        </Text>
        <Text style={[styles.description, { color: selectedTheme.colors.text }]}>
          {item.status}
        </Text>
        <Text style={[styles.subtitle, { color: selectedTheme.colors.text }]}>
          Ship To
        </Text>
        <Text style={[styles.description, { color: selectedTheme.colors.text }]}>
          {item.shipTo}
        </Text>
        <Text style={[styles.subtitle, { color: selectedTheme.colors.text }]}>
          Order Total
        </Text>
        <Text style={[styles.description, { color: selectedTheme.colors.text }]}>
          {item.orderTotal}
        </Text>
        <Text style={[styles.subtitle, { color: selectedTheme.colors.text }]}>
          Order Date
        </Text>
        <Text style={[styles.description, { color: selectedTheme.colors.text }]}>
          {item.orderDate}
        </Text>        
        <Text style={[styles.description, { color: selectedTheme.colors.text }]}>
          {item.imageSrc}
        </Text>
      </ScrollView>
    </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingLeft: 15,
    paddingTop: 15,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    paddingBottom: 16,
    opacity: 0.7,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 30,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemDetail;
