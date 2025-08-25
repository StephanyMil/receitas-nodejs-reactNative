import React, { useState } from 'react';
import './index.css';

const AddCategoryModal = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName.trim());
      setCategoryName('');
    } else {
      alert("O nome da categoria não pode ser vazio.");
    }
  };

  const handleClose = () => {
    setCategoryName('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Nova Categoria</h2>
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <button onClick={handleClose} className="button-secondary">Cancelar</button>
          <button onClick={handleSave} className="button-primary">Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;