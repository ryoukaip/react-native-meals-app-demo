import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import { removeFromFavorites } from '../utils/store';  // Import the action creator
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
const FavoritesScreen = () => {
  const favoriteDishes = useSelector((state) => state.favoriteDishes);  // Access favorites
  const dispatch = useDispatch(); // Get dispatch from redux
  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Image source={item.image} style={styles.favoriteImage} />
      <Text style={styles.favoriteName}>{item.name}</Text>
      {/* Touchable for removing the dish */}
      <TouchableOpacity
        onPress={() => dispatch(removeFromFavorites(item.id))}  // Dispatch the remove action
        style={styles.removeButton}
      >
        <AntDesign name="closecircleo" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      {favoriteDishes.length === 0 ? (
        <Text style={styles.favoriteName}>There is nothing here yet.</Text>
      ) : (
        <FlatList
          data={favoriteDishes}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}  
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  favoriteItem: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  favoriteImage: {
    width: 100,
    height: 100,
  },
  favoriteName: {
    fontSize: 20,
    marginLeft: 15,
    alignSelf: 'center',
  },
  removeButton: {
    padding: 10,
  },
});

export default FavoritesScreen;
