import React, { useCallback, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import api from '../api/api';
import RecipeCard from '../components/RecipeCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={26} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.replace('Login'); 
    }).catch((error) => {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Não foi possível sair.");
    });
  };

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchRecipes(); }, []));

  const handleEdit = (recipe) => {
    navigation.navigate('EditRecipe', { recipe });
  };

  const handleDelete = async (recipeId) => {
    try {
      await api.delete(`/recipes/${recipeId}`);
      setRecipes(prevRecipes => prevRecipes.filter(r => r._id !== recipeId));
    } catch (error) {
      console.error("Erro ao deletar receita:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RecipeCard recipe={item} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          ListEmptyComponent={<View style={styles.emptyContainer}><Text style={styles.emptyText}>Você ainda não adicionou nenhuma receita.</Text></View>}
          contentContainerStyle={{ paddingBottom: 150 }} 
        />
      )}
      <View style={styles.bottomButtonContainer}>
        <View style={styles.buttonWrapper}>
          <Button 
            title="Gerenciar Categorias" 
            onPress={() => navigation.navigate('ManageCategories')} 
            color="#841584"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button 
            title="Adicionar Receita" 
            onPress={() => navigation.navigate('AddRecipe')} 
            color="#f4511e"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: 'gray' },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  logoutButton: {
    marginRight: 15,
    padding: 5,
  },
});

export default HomeScreen;