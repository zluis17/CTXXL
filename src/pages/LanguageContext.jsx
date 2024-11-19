import React, { createContext, useState, useContext } from 'react';

// Crear el contexto para el idioma
const LanguageContext = createContext();

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // idioma por defecto

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage); // Cambia el idioma
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para acceder al contexto desde otros componentes
export const useLanguage = () => {
  return useContext(LanguageContext);
};
