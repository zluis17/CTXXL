import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PasswordResetForm = ({ setModalVisible }) => {
  const [correo, setCorreo] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const closeModal = () => {
    setModalVisible(false);
    setError(null);
    setSuccessMessage('');
    setCorreo('');
    setNuevaContraseña('');
    setConfirmarContraseña('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaContraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/administrador/reset-password', {
        correo,
        nuevaContraseña
      });

      if (response.data.success) {
        setSuccessMessage('Contraseña restablecida con éxito');
        setError(null);
      } else {
        setError(response.data.message || 'Error al restablecer la contraseña.');
      }

      setCorreo('');
      setNuevaContraseña('');
      setConfirmarContraseña('');
    } catch (error) {
      setError('Error al restablecer la contraseña. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate bg-opacity-60 flex justify-center items-center" onClick={closeModal}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-bold text-center mb-8 text-purple-600">Recuperar Contraseña</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Correo Electrónico */}
          <div className="flex flex-col">
            <label htmlFor="correo" className="mb-2 font-semibold text-white">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          {/* Nueva Contraseña */}
          <div className="flex flex-col">
            <label htmlFor="nuevaContraseña" className="mb-2 font-semibold text-white">Nueva Contraseña</label>
            <input
              type="password"
              id="nuevaContraseña"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nueva contraseña"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col">
            <label htmlFor="confirmarContraseña" className="mb-2 font-semibold text-white">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContraseña"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirma la contraseña"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              required
            />
          </div>

          {/* Mensaje de Error */}
          {error && <p className="text-red-500 text-sm mt-1 md:col-span-2">{error}</p>}

          {/* Mensaje de Éxito */}
          {successMessage && <p className="text-green-500 text-sm mt-1 md:col-span-2">{successMessage}</p>}

          {/* Botones */}
          <div className="mx-auto text-center mt-6 flex md:col-span-2">
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md mr-2 hover:bg-gray-700 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-300"
            >
              Restablecer Contraseña
            </button>
          </div>
        </form>

        {/* Enlace a Iniciar Sesión */}
        <div className="text-center mt-6">
          <p className="text-white">
            ¿Recuerdas tu contraseña?{' '}
            <Link to="/singin" onClick={closeModal} className="ml-2 text-purple-500 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
