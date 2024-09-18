import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';  // Heart icon from vector icons library
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../utils/store'; // Import the action creator 

const dishes = {
  '1': [
    { id: '1', name: 'Pizza', image: require('../assets/pizza.png') },
    { id: '2', name: 'Pasta', image: require('../assets/pasta.png') },
  ],
  '2': [
    { id: '1', name: 'Dumplings', image: require('../assets/dumplings.png') },
    { id: '2', name: 'Fried Rice', image: require('../assets/friedrice.png') },
  ],
};

const MenuDetailScreen = () => {
  const route = useRoute();
  const { categoryId } = route.params;
  const categoryDishes = dishes[categoryId];

  const dispatch = useDispatch(); // Get dispatch from redux

  const renderDishItem = ({ item }) => (
    <View style={styles.dishItem}>
      <Image source={item.image} style={styles.dishImage} />
      <Text style={styles.dishName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => dispatch(addToFavorites(item))}  // Add dish to favorites
        style={styles.heartIcon}
      >
        <AntDesign name="hearto" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={categoryDishes}
      renderItem={renderDishItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  dishItem: {
    margin: 15,
    height: 120,
    flexDirection: 'row',
  },
  dishImage: {
    width: 100,
    height: 100,
  },
  dishName: {
    marginLeft: 20,
    fontSize: 20,
    alignSelf: 'center',
  },
  heartIcon: {
    padding: 10,
  },
});

export default MenuDetailScreen;
