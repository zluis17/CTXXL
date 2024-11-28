import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Crea el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData); // Guarda los datos del usuario en el estado
    // Redirecciona según el tipo de usuario
    if (userData.tipoUsuario === 'administrador') {
      navigate('/admin/home');
    } else {
      navigate('/empleado/homeE');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); // Elimina el usuario del estado
    navigate('/login'); // Redirige al login
  };

  // Proveedor del contexto
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
