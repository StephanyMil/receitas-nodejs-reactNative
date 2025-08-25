import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView, TouchableOpacity } from 'react-native';
import api from '../api/api';
import { Picker } from '@react-native-picker/picker';
import AddCategoryModal from '../components/AddCategoryModal';
import PropTypes from 'prop-types';

const MEASUREMENT_UNITS = [
  'g (gramas)', 'kg (quilos)', 'ml (mililitros)', 'L (litros)', 'xícara(s)', 'colher(es) de sopa',
  'colher(es) de chá', 'unidade(s)', 'a gosto', 'pitada(s)', 'dente(s)', 'fatia(s)',
];

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredientName, setCurrentIngredientName] = useState('');
  const [currentIngredientQty, setCurrentIngredientQty] = useState('');
  const [currentIngredientUnit, setCurrentIngredientUnit] = useState(MEASUREMENT_UNITS[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
        if (response.data.length > 0 && !selectedCategory) {
          setSelectedCategory(response.data[0]._id);
        }
      } catch (error) { console.error("Erro ao buscar categorias:", error); }
    };
    fetchCategories();
  }, [selectedCategory]);
  
  const handleAddIngredient = () => {
    if (currentIngredientName.trim() && currentIngredientQty.trim()) {
      setIngredients([...ingredients, { name: currentIngredientName, quantity: currentIngredientQty, unit: currentIngredientUnit }]);
      setCurrentIngredientName('');
      setCurrentIngredientQty('');
    } else {
      Alert.alert('Erro', 'Preencha o nome e a quantidade do ingrediente.');
    }
  };
  
  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleAddNewCategory = () => {
    setIsModalVisible(true);
  };

  const handleSaveCategory = async (newCategoryName) => {
    try {
      const response = await api.post('/categories', { name: newCategoryName });
      const newCategory = response.data;
      setCategories(prevCategories => [...prevCategories, newCategory]);
      setSelectedCategory(newCategory._id);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      Alert.alert('Erro', 'Não foi possível adicionar a categoria. Ela já pode existir.');
    }
  };

  const handleAddRecipe = async () => {
    if (!title || ingredients.length === 0 || !instructions || !selectedCategory) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    
    const recipeData = {
      title,
      instructions,
      category: selectedCategory,
      ingredients,
    };

    try {
      await api.post('/recipes', recipeData);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar a receita.');
    }
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <TextInput placeholder="Título da Receita" value={title} onChangeText={setTitle} style={styles.input} />
        
        <View style={styles.categoryContainer}>
          <Picker selectedValue={selectedCategory} onValueChange={(itemValue) => setSelectedCategory(itemValue)} style={styles.picker}>
            {categories.map((cat) => (<Picker.Item label={cat.name} value={cat._id} key={cat._id} />))}
          </Picker>
          <Button title="Nova Categoria" onPress={handleAddNewCategory} color="#f4511e" />
        </View>
        
        <Text style={styles.label}>Ingredientes</Text>
        <View style={styles.ingredientInputContainer}>
          <TextInput placeholder="Nome do Ingrediente" value={currentIngredientName} onChangeText={setCurrentIngredientName} style={styles.input} />
          <View style={styles.quantityRow}>
            <TextInput placeholder="Qtd." value={currentIngredientQty} onChangeText={setCurrentIngredientQty} style={styles.quantityInput} keyboardType="numeric" />
            <Picker selectedValue={currentIngredientUnit} onValueChange={(itemValue) => setCurrentIngredientUnit(itemValue)} style={styles.unitPicker}>
              {MEASUREMENT_UNITS.map((unit) => (<Picker.Item label={unit} value={unit} key={unit} />))}
            </Picker>
          </View>
          <Button title="Adicionar Ingrediente" onPress={handleAddIngredient} color="#841584" />
        </View>

        {ingredients.map((ing, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text>{ing.quantity} {ing.unit} de {ing.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
              <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TextInput placeholder="Modo de Preparo" value={instructions} onChangeText={setInstructions} style={[styles.input, styles.textArea]} multiline />
        <Button title="Salvar Receita" onPress={handleAddRecipe} color="#841584" />
      </ScrollView>
      <AddCategoryModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveCategory}
      />
    </>
  );
};

AddRecipeScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  input: { backgroundColor: 'white', borderColor: '#ddd', borderWidth: 1, marginBottom: 15, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8 },
  textArea: { height: 150, textAlignVertical: 'top', marginTop: 15 },
  categoryContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: 'white', marginBottom: 15 },
  picker: {},
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333', borderTopColor: '#ccc', borderTopWidth: 1, paddingTop: 15, marginTop: 10 },
  ingredientInputContainer: { padding: 10, backgroundColor: '#fff', borderRadius: 8, marginBottom: 15, borderColor: '#ddd', borderWidth: 1 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  quantityInput: { flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  unitPicker: { flex: 2 },
  ingredientItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#e9e9e9', borderRadius: 5, marginBottom: 5 },
  removeText: { color: 'red', fontWeight: 'bold' }
});

export default AddRecipeScreen;