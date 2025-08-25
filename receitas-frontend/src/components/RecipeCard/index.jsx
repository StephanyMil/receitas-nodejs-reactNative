import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../api/api.js';
import './index.css';

const RecipeCard = ({ recipe, onDelete }) => {
  
  const handleDelete = async () => {
    if (window.confirm(`Você tem certeza que quer deletar a receita "${recipe.title}"?`)) {
      try {
        await api.delete(`/recipes/${recipe._id}`);
        onDelete(recipe._id);
      } catch (error) {
        console.error("Erro ao deletar receita:", error);
        alert("Não foi possível deletar a receita.");
      }
    }
  };
  
  return (
    <div className="recipe-card">
      <div className="card-header">
        <h3 className="recipe-title">{recipe.title}</h3>
        {recipe.category && <span className="category-badge">{recipe.category.name}</span>}
      </div>
      
      <div className="card-body">
        <h4>Ingredientes:</h4>
        <ul className="ingredients-list">
          {recipe.ingredients.map((item) => (
            <li key={item.name}>
              {item.quantity} {item.unit} de {item.name}
            </li>
          ))}
        </ul>
        
        <h4>Modo de Preparo:</h4>
        <p className="instructions">{recipe.instructions}</p>
      </div>

      <div className="card-footer">
        <Link to={`/edit-recipe/${recipe._id}`} className="card-button edit-button">
          Editar
        </Link>
        <button onClick={handleDelete} className="card-button delete-button">Deletar</button>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string
    }),
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        unit: PropTypes.string,
        name: PropTypes.string
      })
    ).isRequired,
    instructions: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default RecipeCard;