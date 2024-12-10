import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './store/categorySlice';
import CategoryListScreen from './screens/CategoryListScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';
import EditCategoryScreen from './screens/EditCategoryScreen';

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Categories" component={CategoryListScreen} />
          <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
          <Stack.Screen name="EditCategory" component={EditCategoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

