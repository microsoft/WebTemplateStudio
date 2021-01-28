import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import SvgImage from "../../components/SvgImage/SvgImage";

import useThemeContext from "../../hooks/useThemeContext";
import themes from "../../themes";

function ItemDetail({ item }) {
  const { theme } = useThemeContext();
  const selectedTheme = themes[theme];
  const itemImage = (item && item.imageSrc) || (item && "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg");

  return (

    (item &&
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: selectedTheme.colors.background },
        ]}>
        <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: selectedTheme.colors.background }]}>
          <View style={styles.titleContainer}>
            <SvgImage style={styles.logo} uri={itemImage} />
            <Text style={[styles.title, { color: selectedTheme.colors.text }]}>
              {item.title}
            </Text>
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
          <Text>
            TODO HERE ** Temp just to see a scrollable area **
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis rutrum odio in dignissim. Sed a ligula metus. Fusce congue, nibh vitae elementum luctus, quam lectus venenatis nulla, et aliquet risus est in justo. Morbi semper dignissim velit, ut dictum lacus imperdiet aliquam. Praesent iaculis mattis lacus, non pharetra ipsum volutpat vitae. Sed sit amet urna aliquet, aliquam lectus at, vestibulum erat. Curabitur orci ex, consequat at mauris sed, tempus faucibus nisi. Aenean facilisis velit lorem, sodales malesuada felis elementum et. Praesent euismod sapien sed eros maximus lacinia. Aenean sed arcu augue. Vivamus ultrices ornare maximus. Proin non vulputate lectus. Vivamus at dui sed dui ullamcorper feugiat. Phasellus varius aliquet tortor at pharetra. Donec quis vulputate dolor.

            Suspendisse potenti. Ut at erat ut ipsum vulputate cursus. Etiam posuere nisl lectus, commodo blandit purus aliquet eu. Integer in dignissim velit, ac molestie ante. Nam vestibulum quam at sapien ullamcorper suscipit. Quisque elementum nisi eu finibus aliquet. Sed a dolor magna. Nam rhoncus velit nibh, ut accumsan purus cursus vitae. Nam a lobortis lorem, eget scelerisque lectus. Aliquam a dictum lectus. Pellentesque tristique augue nec condimentum elementum. Aliquam consequat, nulla ac fringilla cursus, lacus enim laoreet velit, nec porttitor mi metus ac nulla. Aenean tempus lacinia tortor. Nullam commodo tristique ultricies. Quisque ac elementum nisi, molestie tincidunt nisi. Maecenas quis semper tellus.

            Etiam porttitor tincidunt mi, vitae viverra tellus mollis faucibus. Donec tempor vulputate quam, non eleifend erat eleifend ut. Donec lobortis sodales ipsum. Aliquam in nunc et enim fermentum interdum. Integer at imperdiet lorem. Quisque eget efficitur neque. Nulla imperdiet ante ipsum, vel hendrerit mauris dignissim quis. Curabitur ultrices, magna ut placerat viverra, lacus erat ultrices mi, mollis iaculis ipsum sapien eget tellus. Morbi a massa ut turpis lobortis convallis volutpat ac tortor. Morbi facilisis varius erat. Nam dignissim feugiat neque ut condimentum. Mauris dapibus porttitor dignissim.
          </Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingLeft: 15,
  },
  section: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    textAlignVertical: "center",
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
