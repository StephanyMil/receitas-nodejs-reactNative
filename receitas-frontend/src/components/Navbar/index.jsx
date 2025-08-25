import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.js';
import './index.css';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Meu Livro de Receitas</Link>
      <div className="navbar-links">
        {currentUser ? (
          <>
            <Link to="/">Ver Receitas</Link>
            <Link to="/add-recipe">Adicionar Receita</Link>
            <Link to="/manage-categories">Categorias</Link>
            <button onClick={handleLogout} className="logout-button">Sair</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;