import React, { useState, useEffect } from 'react';
import api from '../api/api';
import './Form.css';

const ManageCategories = () => {
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim() === '') {
      alert('O nome da categoria não pode ser vazio.');
      return;
    }
    try {
      await api.post('/categories', { name: newCategoryName });
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      alert('Não foi possível adicionar a categoria. Ela já pode existir.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Gerenciar Categorias</h2>
        <form onSubmit={handleAddCategory} className="category-form">
          <div className="input-group">
            <label htmlFor="newCategory">Nova Categoria</label>
            <input
              type="text"
              id="newCategory"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Ex: Sobremesas"
            />
          </div>
          <button type="submit" className="submit-button">Adicionar</button>
        </form>

        <div className="category-list">
          <h3>Categorias Existentes</h3>
          {loading ? <p>Carregando...</p> : (
            <ul>
              {categories.map(cat => (
                <li key={cat._id}>{cat.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;