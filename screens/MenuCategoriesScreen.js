import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { style, rem } from '../utils/responsive'
const categories = [
  { id: '1', name: 'Italian', image: require('../assets/italian.png') },
  { id: '2', name: 'Chinese', image: require('../assets/chinese.png') },
  // Add more categories...
];

const MenuCategoriesScreen = ({ navigation }) => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate('MenuDetail', { categoryId: item.id })}>
      <View>
        <Image source={item.image} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 0,
    height: rem(15),
    borderRadius: 10,
    justifyContent: 'center'
    // overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '80%',
  },
  categoryName: {
    textAlign: 'center',
    fontSize: 18,
    
    marginVertical: 0,
  },
});

export default MenuCategoriesScreen;
