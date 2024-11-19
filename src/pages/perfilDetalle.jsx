import React, { useState } from 'react';

const PerfilDetalle = () => {
  const [formData, setFormData] = useState({
    Nombres: 'Luiss',
    Apellidos: 'Quintero',
    Telefono: '+57 3227859837',
    Correo: 'lquinteroramos684@gmail.com',
    País: 'Colombia',
    Ciudad: 'Bogotá',
    CodigoPostal: '12005',
    Tipo: '',
  });
  
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); // Imagen de perfil inicial

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Actualiza la imagen de perfil con la nueva URL base64
      };
      reader.readAsDataURL(file); // Lee el archivo como URL base64
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-300">
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="bg-gray-800 text-white rounded-lg mb-6 p-6 relative">
          <h1 className="text-3xl font-bold">Perfil</h1>
          
        </div>

        {/* Profile and Form */}
        <div className="flex space-x-6">
          {/* Profile Card */}
          <div className="w-1/3 bg-white rounded-lg shadow p-4">
            <img
              src={profileImage} // Muestra la imagen de perfil seleccionada
              alt="User"
              className="rounded-full w-32 h-32 mx-auto mb-4"
            />
            <h2 className="text-center text-xl font-bold">{formData.Nombres} {formData.Apellidos}</h2>
            <p className="text-center text-gray-500">{formData.Correo}</p>

            {/* Botón de cambio de imagen de perfil */}
            <div className="mt-4 w-full">
              <label className="bg-gray-600 text-white rounded py-2 px-4 text-center cursor-pointer block">
                Cambiar Foto de Perfil
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden" // Oculta el input de archivo
                />
              </label>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Prendas Recibidads:</span>
                <span>30</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Materiales Recibidos:</span>
                <span>15</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Horas Trabajadas:</span>
                <span>5</span>
              </div>
            </div>
          
          </div>

          {/* Profile Form */}
          <div className="w-2/3 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Configuración de Cuenta</h2>
            <form className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 font-semibold">Nombres</label>
                <input
                  type="text"
                  name="Nombres"
                  value={formData.Nombres}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 rounded bg-gray-100 border border-gray-300"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Apellidos</label>
                <input
                  type="text"
                  name="Apellidos"
                  value={formData.Apellidos}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 rounded bg-gray-100 border border-gray-300"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Teléfono</label>
                <input
                  type="text"
                  name="Telefono"
                  value={formData.Telefono}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 rounded bg-gray-100 border border-gray-300"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Correo Electrónico</label>
                <input
                  type="email"
                  name="Correo"
                  value={formData.Correo}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 rounded bg-gray-100 border border-gray-300"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Ciudad</label>
                <input
                  type="text"
                  name="Ciudad"
                  value={formData.Ciudad}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 rounded bg-gray-100 border border-gray-300"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">País</label>
                <input
                  type="text"
                  name="País"
                  value={formData.País}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 rounded bg-gray-100 border border-gray-300"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Código Postal</label>
                <input
                  type="text"
                  name="CodigoPostal"
                  value={formData.CodigoPostal}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 rounded bg-gray-100 border border-gray-300"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Tipo de Cuenta</label>
                <input
                  type="text"
                  name="Tipo"
                  value={formData.Tipo}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 rounded bg-gray-100 border border-gray-300"
                />
              </div>
            </form>
            <button className="mt-6 bg-gray-600 text-white px-4 py-2 rounded">Actualizar</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerfilDetalle;
