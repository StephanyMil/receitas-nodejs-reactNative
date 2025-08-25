import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/api';
import RecipeCard from '../../components/RecipeCard/index.jsx';
import './index.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleDeleteRecipe = (deletedRecipeId) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== deletedRecipeId));
  };

  if (loading) {
    return <div className="loading-message">Carregando receitas...</div>;
  }

  return (
    <div className="home-container">
      <h1>Minhas Receitas</h1>
      {recipes.length === 0 ? (
        <p className="empty-message">Você ainda não adicionou nenhuma receita.</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <RecipeCard 
              key={recipe._id} 
              recipe={recipe} 
              onDelete={handleDeleteRecipe} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;