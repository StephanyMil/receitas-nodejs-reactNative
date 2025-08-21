import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import EditRecipeScreen from '../screens/EditRecipeScreen';
import CategoryScreen from '../screens/CategoryScreen'; 

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Minhas Receitas' }} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} options={{ title: 'Nova Receita' }} />
        <Stack.Screen name="EditRecipe" component={EditRecipeScreen} options={{ title: 'Editar Receita' }} />
        <Stack.Screen name="ManageCategories" component={CategoryScreen} options={{ title: 'Gerenciar Categorias' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;