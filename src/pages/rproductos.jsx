import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URI = 'https://backend2-mhjh.onrender.com/api/productos/';
const URI_ADMIN = 'https://backend2-mhjh.onrender.com/api/administrador';
const URI_EMPLEADO = 'https://backend2-mhjh.onrender.com/api/empleado';

function Rproductos({ setModalVisible }) { 
    const [CantidadR, setCantidad] = useState('');
    const [Material, setMaterial] = useState('');
    const [Colores, setColor] = useState('');
    const [id_administrador, setid_administrador] = useState('');
    const [id_Empleado, setid_Empleado] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [filteredMateriales, setFilteredMateriales] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const [administrador, setAdministrador] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdministrador = async () => {
            try {
                const response = await axios.get(URI_ADMIN);
                setAdministrador(response.data); 
            } catch (error) {
                console.error('Error al obtener administradores:', error);
            }
        };
        fetchAdministrador();
    }, []);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get(URI_EMPLEADO);
                setEmpleados(response.data);
            } catch (error) {
                console.error('Error al obtener empleados:', error);
            }
        };
        fetchEmpleados();

        const materialesCargados = [
            { id: 1, tipo: 'Algodón' },
            { id: 2, tipo: 'Poliéster' },
            { id: 3, tipo: 'Lana' },
            { id: 4, tipo: 'Seda' },
            { id: 5, tipo: 'Nylon' },
            { id: 6, tipo: 'Rayon' },
            { id: 7, tipo: 'Lino' },
            { id: 8, tipo: 'Sarga' },
            { id: 9, tipo: 'Microfibra' },
            { id: 10, tipo: 'Elestano' }
        ];
        setMateriales(materialesCargados);
    }, []);

    useEffect(() => {

        const filtered = materiales.filter(material => 
            material.tipo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMateriales(filtered);
        setShowDropdown(filtered.length > 0 && searchTerm.length > 0); 
    }, [searchTerm, materiales]);

    const handleMaterialChange = (e) => {
        setMaterial(e.target.value);
        setSearchTerm(e.target.value); 
        setShowDropdown(false); 
    };

    const handleCantidadChange = (e) => {
        const value = e.target.value;
        if (value >= 0) setCantidad(value);
    };

    const validate = () => {
        const newErrors = {};
        if (!CantidadR || CantidadR <= 0) newErrors.CantidadR = 'La cantidad debe ser un número positivo.';
        if (!Material) newErrors.Material = 'Selecciona un material.';
        if (!Colores) newErrors.Colores = 'Selecciona un color.';
        if (!id_Empleado) newErrors.id_Empleado = 'Selecciona un empleado.';
        if (!id_administrador) newErrors.id_administrador = 'Selecciona un administrador.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const store = async (e) => {
        e.preventDefault();

        if (!validate()) return;
        try {
            const response = await axios.post(URI, {
                CantidadR,
                Material,
                Colores,
                id_administrador,
                id_Empleado,
            });
            console.log('Respuesta del servidor:', response.data);
            navigate('/admin/iproducto');
        } catch (error) {
            console.error('Error al registrar el producto:', error);
        }
    };

    const closeModal = () => {
        setModalVisible(false); 
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
            onClick={closeModal} 
        >
            <div
                className="bg-slate-900 p-6 sm:p-10 rounded-lg shadow-lg max-w-full sm:max-w-2xl w-full mx-4 sm:mx-0 max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()} 
            >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center text-white">Registro de Material</h2>
                <form onSubmit={store}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Empleado */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-white mb-2" htmlFor="id_Empleado">Empleado</label>
                            <select
                                id="id_Empleado"
                                value={id_Empleado}
                                onChange={(e) => setid_Empleado(e.target.value)}
                                className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Selecciona un empleado</option>
                                {empleados.map((empleado) => (
                                    <option key={empleado.id_Empleado} value={empleado.id_Empleado}>
                                        {empleado.Nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.id_Empleado && <p className="text-red-500 text-sm mt-1">{errors.id_Empleado}</p>}
                        </div>

                        {/* Cantidad */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-white mb-2" htmlFor="Cantidad">Cantidad</label>
                            <input
                                type="number"
                                id="Cantidad"
                                value={CantidadR}
                                onChange={handleCantidadChange}
                                className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            {errors.CantidadR && <p className="text-red-500 text-sm mt-1">{errors.CantidadR}</p>}
                        </div>

                        {/* Material */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-white mb-2" htmlFor="Material">Material</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar material"
                                    className="w-full px-4 py-3 mb-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {showDropdown && (
                                    <ul className="absolute left-0 right-0 bg-gray-800 text-white rounded-md mt-1 max-h-48 overflow-y-auto z-10">
                                        {filteredMateriales.map((material) => (
                                            <li
                                                key={material.id}
                                                onClick={() => handleMaterialChange({ target: { value: material.tipo } })}
                                                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                            >
                                                {material.tipo}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {errors.Material && <p className="text-red-500 text-sm mt-1">{errors.Material}</p>}
                        </div>

                        {/* Colores */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-white mb-2" htmlFor="Color">Color</label>
                            <select
                                id="Color"
                                value={Colores}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            >
                                <option value="">Selecciona un color</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Azul">Azul</option>
                                <option value="Verde">Verde</option>
                                <option value="Amarillo">Amarillo</option>
                                <option value="Negro">Negro</option>
                            </select>
                            {errors.Colores && <p className="text-red-500 text-sm mt-1">{errors.Colores}</p>}
                        </div>
                    </div>

                    {/* Administrador */}
                    <div className="mb-6">
                        <label className="block text-white mb-2" htmlFor="id_administrador">Administrador</label>
                        <select
                            id="id_administrador"
                            value={id_administrador}
                            onChange={(e) => setid_administrador(e.target.value)}
                            className="w px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        >
                            <option value="">Selecciona un administrador</option>
                            {administrador.map((admin) => (
                                <option key={admin.id_administrador} value={admin.id_administrador}>
                                    {admin.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.id_administrador && <p className="text-red-500 text-sm mt-1">{errors.id_administrador}</p>}
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                        <button
                            onClick={closeModal}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Registrar Material
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Rproductos;
