import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Você tem certeza que quer deletar a receita "${recipe.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", onPress: () => onDelete(recipe._id), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
            <Text style={styles.title}>{recipe.title}</Text>
            {recipe.category && <Text style={styles.category}>{recipe.category.name}</Text>}
        </View>

        <Text style={styles.label}>Ingredientes:</Text>
        {recipe.ingredients.map((item, index) => (
          <Text key={index} style={styles.content}>
            • {item.quantity} {item.unit} de {item.name}
          </Text>
        ))}
        
        <Text style={styles.label}>Instruções:</Text>
        <Text style={styles.content}>{recipe.instructions}</Text>
        
        <View style={styles.buttonContainer}>
          <Button title="Editar" onPress={() => onEdit(recipe)} />
          <Button title="Deletar" color="red" onPress={handleDelete} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', marginVertical: 8, marginHorizontal: 10, borderRadius: 8, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2 },
  cardContent: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', flex: 1, marginRight: 8 },
  category: { fontSize: 12, fontWeight: 'bold', color: 'white', backgroundColor: '#f4511e', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#f4511e' },
  content: { fontSize: 14, marginTop: 5, lineHeight: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee' },
});

export default RecipeCard;