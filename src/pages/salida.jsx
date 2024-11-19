import React from 'react';

const Salida = () => {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://via.placeholder.com/1920x1080')`, // Reemplaza esta URL por la de tu imagen
      }}
    >
      {/* Contenedor central */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center relative">
        {/* Logo de Microsoft (Placeholder) */}
        <div className="mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mx-auto">
            <span className="text-white font-bold text-lg">M</span>
          </div>
        </div>
        {/* Título */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Cerró la sesión de su cuenta</h1>
        {/* Descripción */}
        <p className="text-gray-500 mb-6">Cierre todas las ventanas del navegador.</p>
      </div>
    </div>
  );
};

export default Salida;
