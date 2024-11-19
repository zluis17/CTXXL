import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil = ({ setModalVisible }) => {
  const [rol, setRol] = useState('');

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const closeModal = () => {
    setModalVisible(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!nombre) {
      newErrors.nombre = 'El nombre es requerido.';
    } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      newErrors.nombre = 'El nombre solo debe contener letras.';
    }

    if (!apellido) {
      newErrors.apellido = 'El apellido es requerido.';
    } else if (!/^[a-zA-Z\s]+$/.test(apellido)) {
      newErrors.apellido = 'El apellido solo debe contener letras.';
    }

    if (!correo) {
      newErrors.correo = 'El correo es requerido.';
    }
    if (!contrasena) {
      newErrors.contrasena = 'La contraseña es requerida.';
    }
    if (!telefono || telefono < 0) {
      newErrors.telefono = 'El teléfono debe ser un número válido y positivo.';
    }
    if (!direccion) {
      newErrors.direccion = 'La dirección es requerida.';
    }
    if (!fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Lógica para actualizar el perfil
    console.log({ nombre, apellido, correo, contrasena, telefono, direccion, fechaNacimiento });
    
    closeModal();
    navigate('/app/perfilDetalle');
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-black p-6 md:p-8 rounded-lg shadow-lg max-w-full md:max-w-2xl w-full mx-4 sm:mx-0 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">Perfil Usuario</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleUpdate}>
          {/** Input Fields */}
          {[
            { id: 'nombre', label: 'Nombre', type: 'text', value: nombre, setter: setNombre },
            { id: 'apellido', label: 'Apellido', type: 'text', value: apellido, setter: setApellido },
            { id: 'correo', label: 'Correo', type: 'email', value: correo, setter: setCorreo },
            { id: 'contrasena', label: 'Contraseña', type: 'password', value: contrasena, setter: setContrasena },
            { id: 'telefono', label: 'Teléfono', type: 'tel', value: telefono, setter: setTelefono },
            { id: 'direccion', label: 'Dirección', type: 'text', value: direccion, setter: setDireccion },
            { id: 'rol', label: 'Rol', type: 'text', value: rol, setter: setRol },

          ].map(({ id, label, type, value, setter }) => (
            <div className="space-y-2" key={id}>
              <label htmlFor={id} className="text-white">{label}</label>
              <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={label}
                className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              {errors[id] && <p className="text-red-500">{errors[id]}</p>}
            </div>
          ))}
          
          <div className="space-y-2 col-span-full">
            <label htmlFor="fecha-nacimiento" className="text-white">Fecha de Nacimiento</label>
            <input
              id="fecha-nacimiento"
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.fechaNacimiento && <p className="text-red-500">{errors.fechaNacimiento}</p>}
          </div>

          {/** Buttons */}
          <div className="flex justify-end space-x-2 col-span-full">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 md:px-6 py-2 md:py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 md:px-6 py-2 md:py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-300"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
