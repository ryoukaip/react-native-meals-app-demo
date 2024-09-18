import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';  // Heart icon from vector icons library
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../utils/store'; // Import both add and remove actions

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

  const dispatch = useDispatch();
  const favoriteDishes = useSelector((state) => state.favoriteDishes);  // Access favorite dishes from Redux

  // Check if a dish is already favorited
  const isDishFavorited = (dishId) => {
    return favoriteDishes.some((dish) => dish.id === dishId);
  };

  // Handle the toggle functionality for favoriting/unfavoriting
  const toggleFavorite = (item) => {
    if (isDishFavorited(item.id)) {
      // If the dish is already favorited, remove it
      dispatch(removeFromFavorites(item.id));
    } else {
      // If the dish is not favorited, add it
      dispatch(addToFavorites(item));
    }
  };

  const renderDishItem = ({ item }) => (
    <View style={styles.dishItem}>
      <Image source={item.image} style={styles.dishImage} />
      <Text style={styles.dishName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => toggleFavorite(item)}  // Toggle favorite state on press
        style={styles.heartIcon}
      >
        {/* Conditionally render filled or unfilled heart icon */}
        <AntDesign
          name={isDishFavorited(item.id) ? 'heart' : 'hearto'}  // 'heart' for filled, 'hearto' for outline
          size={24}
          color="red"
        />
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
