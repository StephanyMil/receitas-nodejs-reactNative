import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import AddCategoryModal from '../components/AddCategoryModal/index.jsx';
import './Form.css';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredientName, setCurrentIngredientName] = useState('');
  const [currentIngredientQty, setCurrentIngredientQty] = useState('');
  const [currentIngredientUnit, setCurrentIngredientUnit] = useState('g (gramas)');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const MEASUREMENT_UNITS = [
    'g (gramas)', 'kg (quilos)', 'ml (mililitros)', 'L (litros)', 'xícara(s)', 
    'colher(es) de sopa', 'colher(es) de chá', 'unidade(s)', 'a gosto', 
    'pitada(s)', 'dente(s)', 'fatia(s)',
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0]._id);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddIngredient = () => {
    if (currentIngredientName && currentIngredientQty) {
      setIngredients([...ingredients, { name: currentIngredientName, quantity: currentIngredientQty, unit: currentIngredientUnit }]);
      setCurrentIngredientName('');
      setCurrentIngredientQty('');
    } else {
      alert('Preencha o nome e a quantidade do ingrediente.');
    }
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };
  
  const handleSaveCategory = async (newCategoryName) => {
    try {
      const response = await api.post('/categories', { name: newCategoryName });
      const newCategory = response.data;
      setCategories(prev => [...prev, newCategory]);
      setSelectedCategory(newCategory._id);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      alert('Não foi possível adicionar a categoria. Ela já pode existir.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || ingredients.length === 0 || !instructions || !selectedCategory) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    const recipeData = { title, instructions, category: selectedCategory, ingredients };
    try {
      await api.post('/recipes', recipeData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
      alert('Não foi possível adicionar a receita.');
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-box large">
          <h2>Adicionar Nova Receita</h2>
          
          <div className="input-group">
            <label htmlFor="title">Título</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="category">Categoria</label>
            <div className="category-select-group">
              <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <button type="button" onClick={() => setIsModalOpen(true)} className="add-category-btn">+</button>
            </div>
          </div>

          <div className="card">
            <h3>Ingredientes</h3>
            {ingredients.map((ing, index) => (
              <div key={index} className="ingredient-item">
                <span>{ing.quantity} {ing.unit} de {ing.name}</span>
                <button type="button" onClick={() => handleRemoveIngredient(index)} className="remove-btn">Remover</button>
              </div>
            ))}
            <div className="ingredient-inputs">
              <input type="text" placeholder="Nome" value={currentIngredientName} onChange={(e) => setCurrentIngredientName(e.target.value)} />
              <input type="text" placeholder="Qtd." value={currentIngredientQty} onChange={(e) => setCurrentIngredientQty(e.target.value)} />
              <select value={currentIngredientUnit} onChange={(e) => setCurrentIngredientUnit(e.target.value)}>
                {MEASUREMENT_UNITS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </select>
            </div>
            <button type="button" onClick={handleAddIngredient} className="add-ingredient-btn">Adicionar Ingrediente</button>
          </div>

          <div className="input-group">
            <label htmlFor="instructions">Modo de Preparo</label>
            <textarea id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          </div>

          <button type="submit" className="submit-button">Salvar Receita</button>
        </form>
      </div>
      <AddCategoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
      />
    </>
  );
};

export default AddRecipe;