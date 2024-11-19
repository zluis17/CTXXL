import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URI = 'https://backend2-mhjh.onrender.com/api/Empleado/';
const URI_ADMIN = 'https://backend2-mhjh.onrender.com/api/administrador';

function REmpleados() {
    const [Nombre, setNombre] = useState('');
    const [contraseña, setcontraseña] = useState('');
    const [TipoD, setTipoD] = useState('');
    const [NumeroD, setNumeroD] = useState('');
    const [FechaN, setFechaN] = useState('');
    const [Correo, setCorreo] = useState('');
    const [celular, setcelular] = useState('');
    const [id_administrador, setid_administrador] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 
    const [administrador, setAdministrador] = useState([]);

    useEffect(() => {
        const fetchAdministrador = async () => {
            try {
                const response = await axios.get(URI_ADMIN); // Suponiendo que esta es la ruta para obtener administradores
                setAdministrador(response.data); // Guardar la lista de administradores en el estado
            } catch (error) {
                console.error('Error al obtener administradores:', error);
            }
        };

        fetchAdministrador();
    }, []);

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const minPassLength = 6; // Cambié el nombre de la constante para mayor claridad
        const phoneRegex = /^[0-9]{10,}$/;
        const selectedDate = new Date(FechaN);
        const maxDate = new Date('2025-01-01');
    
        if (!Nombre || !nameRegex.test(Nombre)) {
            newErrors.Nombre = 'El nombre solo puede contener letras.';
        }
        if (!contraseña || contraseña.length < minPassLength) { // Verificación de longitud mínima
            newErrors.contraseña = 'La contraseña debe tener un mínimo de 6 dígitos.';
        }
        if (!Correo || !emailRegex.test(Correo) || !Correo.endsWith('.com')) {
            newErrors.Correo = 'Por favor ingresa un correo válido que termine en ".com".';
        }
        if (!celular || !phoneRegex.test(celular)) {
            newErrors.celular = 'El número de celular debe tener al menos 10 dígitos y contener solo números.';
        }
        if (!FechaN || selectedDate >= maxDate) {
            newErrors.FechaN = 'La fecha de nacimiento no puede ser posterior a 2025.';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const store = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await axios.post(URI, {
                Nombre,
                contraseña,
                TipoD,
                NumeroD,
                FechaN,
                Correo,
                celular,
                id_administrador,
            });
            console.log('Respuesta del servidor:', response.data);
            navigate('/admin/iempleado');
        } catch (error) {
            console.error('Error al registrar el empleado:', error);
        }
    };

    return (
        <div className="bg-slate-300 p-4 sm:p-10 flex justify-center items-center min-h-screen">
            <div className="p-6 sm:p-8 bg-slate-900 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white">
                    Registro Empleado
                </h2>
                <form onSubmit={store}>
                    {/* Grid responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-white mb-2" htmlFor="Nombre">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="Nombre"
                                value={Nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.Nombre ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.Nombre && <p className="text-red-500 text-sm mt-1">{errors.Nombre}</p>}
                        </div>

                        <div>
                            <label className="block text-white mb-2" htmlFor="contraseña">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'} // Aquí cambiamos el tipo de input dependiendo del estado
                                    id="contraseña"
                                    value={contraseña}
                                    onChange={(e) => setcontraseña(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.contraseña ? 'border-red-500' : ''}`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Alternamos el estado de showPassword
                                    className="absolute right-3 top-3 text-gray-400"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12l-3 3m0 0l-3-3m3 3V4m-6 9l-3-3m0 0l-3 3m3-3v10" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12l-3 3m0 0l-3-3m3 3V4m-6 9l-3-3m0 0l-3 3m3-3v10" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.contraseña && <p className="text-red-500 text-sm mt-1">{errors.contraseña}</p>}
                        </div>

                        <div>
                            <label className="block text-white mb-2" htmlFor="TipoD">
                                Tipo Documento
                            </label>
                            <select
                                id="TipoD"
                                value={TipoD}
                                onChange={(e) => setTipoD(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            >
                                <option value="">Selecciona un tipo</option>
                                <option value="CC">Cédula de Ciudadanía (CC)</option>
                                <option value="TI">Tarjeta de Identidad (TI)</option>
                                <option value="NIT">Número de Identificación Tributaria (NIT)</option>
                                <option value="CE">Cédula de Extranjería (CE)</option>
                                <option value="PA">Pasaporte (PA)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-white mb-2" htmlFor="NumeroD">
                                Número Documento
                            </label>
                            <input
                                type="number"
                                id="NumeroD"
                                value={NumeroD}
                                onChange={(e) => setNumeroD(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2" htmlFor="FechaN">
                                Fecha Nacimiento
                            </label>
                            <input
                                type="date"
                                id="FechaN"
                                value={FechaN}
                                onChange={(e) => setFechaN(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.FechaN ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.FechaN && <p className="text-red-500 text-sm mt-1">{errors.FechaN}</p>}
                        </div>

                        <div>
                            <label className="block text-white mb-2" htmlFor="Correo">
                                Correo
                            </label>
                            <input
                                type="email"
                                id="Correo"
                                value={Correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.Correo ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.Correo && <p className="text-red-500 text-sm mt-1">{errors.Correo}</p>}
                        </div>

                        {/* Celular y Administrador juntos */}
                        <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white mb-2" htmlFor="celular">
                                    Celular
                                </label>
                                <input
                                    type="number"
                                    id="celular"
                                    value={celular}
                                    onChange={(e) => setcelular(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.celular ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.celular && <p className="text-red-500 text-sm mt-1">{errors.celular}</p>}
                            </div>

                            <div>
                                <label className="block text-white mb-2" htmlFor="id_administrador">
                                    Administrador
                                </label>
                                <select
                                        id="id_administrador"
                                        value={id_administrador}
                                        onChange={(e) => setid_administrador(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    >
                                        <option value="">Selecciona un administrador</option>
                                        {administrador.map((admin) => (
                                            <option key={admin.id_administrador} value={admin.id_administrador}>
                                                {admin.nombre}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                        <button
                            onClick={() => navigate('/admin/iempleado')}
                            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700"
                        >
                            registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default REmpleados;
