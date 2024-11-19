import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiTwotoneEye, AiFillEyeInvisible } from 'react-icons/ai';
import PasswordResetForm from './RecuperarContra'; 
import LogoCTXY from '../img/LogoCTXY.jpg'; 

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('administrador'); // Estado para el tipo de usuario
  const [recordarContraseña, setRecordarContraseña] = useState(false); // Estado para recordar contraseña
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarContraseña, setMostrarContraseña] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal
  const navigate = useNavigate();

  const validateForm = () => {
    if (!correo || !contraseña) {
      setError('Por favor, completa todos los campos.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net|org|info|biz|co|[a-z]{2})$/i;

    if (!emailPattern.test(correo)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return false;
    }

    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const endpoint = tipoUsuario === 'administrador'
        ? 'https://backend2-mhjh.onrender.com/api/administrador/login'
        : 'https://backend2-mhjh.onrender.com/api/empleado/login';

      console.log('Enviando datos:', { correo, contraseña, tipoUsuario, recordarContraseña });
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.message || 'Error en la autenticación');
      }

      const data = await response.json();
      console.log('Login exitoso:', data);

      if (tipoUsuario === 'administrador') {
        navigate('/admin/home');
      } else {
        navigate('/empleado/homeE');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error.message || 'Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-400">
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-2xl shadow-purple-600/100">
        <img src={LogoCTXY} alt="LogoCTXY" className="h-8 mx-auto" />
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Iniciar Sesión</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Selector para el tipo de usuario */}
          <div className="mb-6">
            <label className="block text-white mb-2">Tipo de Usuario</label>
            <select 
              value={tipoUsuario} 
              onChange={(e) => setTipoUsuario(e.target.value)} 
              className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="administrador">Administrador</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-900"
              required  
            />
          </div>

          <div className="mb-6 relative ">
            <label className="block text-white mb-2" htmlFor="contraseña">Contraseña</label>
            <input
              type={mostrarContraseña ? 'text' : 'password'}
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <span 
              onClick={() => setMostrarContraseña(!mostrarContraseña)}
              className="aling-center absolute right-4 top-3/4 transform -translate-y-3/4 cursor-pointer text-white"
            >
              {mostrarContraseña ? <AiFillEyeInvisible /> : <AiTwotoneEye />}
            </span>
          </div>

          {/* Checkbox de recordar sesión */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="recordar"
                checked={recordarContraseña}
                onChange={(e) => setRecordarContraseña(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="recordar" className="text-white">Recordar sesión</label>
            </div>
            <button type="button" onClick={() => setModalVisible(true)} className="text-purple-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className={`w-full bg-violet-900 text-white py-3 rounded-md hover:bg-violet-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>

          <div className="mt-4 text-center text-white">
            <span>¿No tienes cuenta?</span>
            <Link to="/login" className="ml-2 text-purple-500 hover:underline">Regístrate</Link>
          </div>
        </form>

        {/* Modal de recuperación de contraseña */}
        {modalVisible && <PasswordResetForm setModalVisible={setModalVisible} />}
      </div>
    </div>
  );
}

export default Login;
