import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import MenuCategoriesScreen from './screens/MenuCategoriesScreen';
import MenuDetailScreen from './screens/MenuDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import store from './utils/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MenuCategories">
      <Stack.Screen
        name="MenuCategories"
        component={MenuCategoriesScreen}
        options={{ title: 'Categories' }} // Static title for the main categories screen
      />
      <Stack.Screen
        name="MenuDetail"
        component={MenuDetailScreen}
        options={({ route }) => ({
          title: `Menu ${route.params.categoryId}`, // Dynamic title based on category selected
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => alert('Marked as favorite')}>
          //     <Text style={{ marginRight: 10, color: 'blue' }}>Favorite</Text>
          //   </TouchableOpacity>
          // ),
        })}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Categories') {
            iconName = 'list-circle-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Categories" component={StackNavigator}/>
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    </Provider>
  );
}
