import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../api/api';

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleAddRecipe = async () => {
    if (!title || !ingredients || !instructions) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    try {
      await api.post('/recipes', { title, ingredients, instructions });
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar a receita.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título da Receita" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Ingredientes (um por linha)" value={ingredients} onChangeText={setIngredients} style={[styles.input, styles.textArea]} multiline />
      <TextInput placeholder="Modo de Preparo" value={instructions} onChangeText={setInstructions} style={[styles.input, styles.textArea]} multiline />
      <Button title="Adicionar Receita" onPress={handleAddRecipe} color="#f4511e" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  input: { backgroundColor: 'white', borderColor: '#ddd', borderWidth: 1, marginBottom: 15, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, },
  textArea: { height: 120, textAlignVertical: 'top' }
});

export default AddRecipeScreen;