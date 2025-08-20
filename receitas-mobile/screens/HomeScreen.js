import React, { useCallback, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api/api';
import RecipeCard from '../components/RecipeCard';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useFocusEffect(
    useCallback(() => {
      fetchRecipes();
    }, [])
  );

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
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <Button 
        title="Adicionar Nova Receita" 
        onPress={() => navigation.navigate('AddRecipe')} 
        color="#f4511e"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: 'gray' }
});

export default HomeScreen;