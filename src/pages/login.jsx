import React, { useState } from 'react';
import '../index.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LogoCTXY from '../img/LogoCTXY.jpg'; 


const URI = 'https://backend2-mhjh.onrender.com/api/administrador/';

function Registro() {
  const [Nombre, setNombre] = useState('');
  const [FechaNacimiento, setFechaNacimiento] = useState('');
  const [TipoDoc, setTipoDoc] = useState('');
  const [NumeroDoc, setNumeroDoc] = useState('');
  const [Correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    // Validar el número de documento
    if (NumeroDoc.length !== 10 || !/^\d+$/.test(NumeroDoc)) {
      alert('El número de documento debe tener exactamente 10 dígitos y ser solo números.');
      return;
    }

    // Validar el correo
    if (!/\S+@\S+\.\S+/.test(Correo)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const response = await axios.post(URI, {
        Nombre,
        FechaNacimiento,
        TipoDoc,
        NumeroDoc,
        Correo,
        celular,
        contraseña,
      });
      console.log('Respuesta del servidor:', response.data);
      navigate('/index'); // Redirige a la página de index
    } catch (error) {
      console.error('Error al registrar el administrador:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-400">
    <div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-2xl shadow-purple-600">
      <img src={LogoCTXY} alt="LogoCTXY" className="h-8 mx-auto" />
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Registro</h2>
      <form onSubmit={store}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-white mb-2" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-white mb-2" htmlFor="FechaNacimiento">Fecha Nacimiento</label>
              <input
                type="date"
                id="FechaNacimiento"
                value={FechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-white mb-2" htmlFor="TipoDoc">Tipo Documento</label>
              <select
                id="TipoDoc"
                value={TipoDoc}
                onChange={(e) => setTipoDoc(e.target.value)}
                className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="PA">Pasaporte (PA)</option>
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-white mb-2" htmlFor="NumeroDoc">Número Documento</label>
              <input
                type="text"
                id="NumeroDoc"
                value={NumeroDoc}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setNumeroDoc(value);
                  }
                }}
                className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-white mb-2" htmlFor="Correo">Correo</label>
              <input
                type="email"
                id="Correo"
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-white mb-2" htmlFor="celular">Celular</label>
              <input
                type="text"
                id="celular"
                value={celular}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setCelular(value);
                  }
                }}
                className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex justify-between mb-6">
            <Link to="/index">
              <button
                type="button"
                className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-900 transition duration-200"
              >
                Cancelar
              </button>
            </Link>
            <button
              type="submit"
              className="w-full ml-2 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration=200"
            >
              Registrarse
            </button>
          </div>

          <div className="mt-4 text-center text-white">
            <span>¿Ya tienes cuenta?</span>
            <Link to="/singin" className="ml-2 text-purple-500 hover:underline">Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
