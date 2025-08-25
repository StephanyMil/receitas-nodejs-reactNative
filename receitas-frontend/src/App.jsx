import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/index.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home/index.jsx';
import AddRecipe from './pages/AddRecipe.jsx';
import EditRecipe from './pages/EditRecipe.jsx';
import ManageCategories from './pages/ManageCategories.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route 
            path="/"
            element={<ProtectedRoute><Home /></ProtectedRoute>}
          />
          <Route
            path="/add-recipe"
            element={<ProtectedRoute><AddRecipe /></ProtectedRoute>}
          />
          <Route
            path="/edit-recipe/:id"
            element={<ProtectedRoute><EditRecipe /></ProtectedRoute>}
          />
          <Route
            path="/manage-categories"
            element={<ProtectedRoute><ManageCategories /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;