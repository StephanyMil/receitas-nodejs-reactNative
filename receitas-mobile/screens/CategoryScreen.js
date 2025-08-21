import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../api/api';

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '') {
      Alert.alert('Erro', 'O nome da categoria não pode ser vazio.');
      return;
    }
    try {
      await api.post('/categories', { name: newCategoryName });
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a categoria. Ela já pode existir.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome da nova categoria"
          value={newCategoryName}
          onChangeText={setNewCategoryName}
          style={styles.input}
        />
        <Button title="Adicionar" onPress={handleAddCategory} color="#f4511e" />
      </View>

      <Text style={styles.title}>Categorias Existentes</Text>
      
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <Text>{item.name}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhuma categoria encontrada.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f5f5f5' 
},
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
},
  input: { 
    flex: 1, 
    backgroundColor: 'white', 
    borderColor: '#ddd', 
    borderWidth: 1, 
    marginRight: 10, 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: 8 
},
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#ddd', 
    paddingTop: 20 
},
  categoryItem: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10 
},
});

export default CategoryScreen;