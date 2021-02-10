import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import useThemeContext from '../../../hooks/useThemeContext';
import { getStyles } from './ItemDetail.style';

function ItemDetail({ item }) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme);

  return (
    item && (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Icon style={styles.icon} name={item.icon} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={styles.description}>{item.shortDescription}</Text>

          <Text style={styles.subtitle}>Status</Text>
          <Text style={styles.description}>{item.status}</Text>
          <Text style={styles.subtitle}>Ship To</Text>
          <Text style={styles.description}>{item.shipTo}</Text>
          <Text style={styles.subtitle}>Order Total</Text>
          <Text style={styles.description}>{item.orderTotal}</Text>
          <Text style={styles.subtitle}>Order Date</Text>
          <Text style={styles.description}>{item.orderDate}</Text>
          <Text style={styles.text}>{item.longDescription}</Text>
        </ScrollView>
      </SafeAreaView>
    )
  );
}

export default ItemDetail;
