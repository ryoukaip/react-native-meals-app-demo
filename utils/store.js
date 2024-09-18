// store.js
import { createStore } from 'redux';

// Initial State
const initialState = {
  favoriteDishes: [],
};

// Action Types
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

// Action Creators
export const addToFavorites = (dish) => ({
  type: ADD_TO_FAVORITES,
  payload: dish,
});

export const removeFromFavorites = (dishId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: dishId,
});

// Reducer
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      // Only add the dish if it isn't already in the favorites
      if (!state.favoriteDishes.find(dish => dish.id === action.payload.id)) {
        return {
          ...state,
          favoriteDishes: [...state.favoriteDishes, action.payload],
        };
      }
      return state;  // Return the state unchanged if the dish is already in favorites

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteDishes: state.favoriteDishes.filter(dish => dish.id !== action.payload),
      };

    default:
      return state;
  }
};

// Create Store
const store = createStore(favoriteReducer);

export default store;
