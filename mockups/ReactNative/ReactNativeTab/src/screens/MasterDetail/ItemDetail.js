import React from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import SvgImage from '../../components/SvgImage/SvgImage';
import {longLoremIpsum} from '../../data/sampleData';

import useThemeContext from '../../hooks/useThemeContext';
import themes from '../../themes';

function ItemDetail({item}) {
  const {theme} = useThemeContext();
  const selectedTheme = themes[theme];

  return (
    item && (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: selectedTheme.colors.background},
        ]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            {backgroundColor: selectedTheme.colors.background},
          ]}>
          <View style={styles.titleContainer}>
            <SvgImage style={styles.logo} uri={item.imageSrc} />
            <Text style={[styles.title, {color: selectedTheme.colors.text}]}>
              {item.title}
            </Text>
          </View>
          <Text
            style={[styles.description, {color: selectedTheme.colors.text}]}>
            {item.shortDescription}
          </Text>

          <Text style={[styles.subtitle, {color: selectedTheme.colors.text}]}>
            Status
          </Text>
          <Text
            style={[styles.description, {color: selectedTheme.colors.text}]}>
            {item.status}
          </Text>
          <Text style={[styles.subtitle, {color: selectedTheme.colors.text}]}>
            Ship To
          </Text>
          <Text
            style={[styles.description, {color: selectedTheme.colors.text}]}>
            {item.shipTo}
          </Text>
          <Text style={[styles.subtitle, {color: selectedTheme.colors.text}]}>
            Order Total
          </Text>
          <Text
            style={[styles.description, {color: selectedTheme.colors.text}]}>
            {item.orderTotal}
          </Text>
          <Text style={[styles.subtitle, {color: selectedTheme.colors.text}]}>
            Order Date
          </Text>
          <Text
            style={[styles.description, {color: selectedTheme.colors.text}]}>
            {item.orderDate}
          </Text>
          <Text>{longLoremIpsum}</Text>
        </ScrollView>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingLeft: 15,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    textAlignVertical: 'center',
  },
  subtitle: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    paddingBottom: 16,
    opacity: 0.7,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 20,
    margin: 10,
  },
});

export default ItemDetail;
