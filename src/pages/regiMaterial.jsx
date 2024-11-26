import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext'; // Importar el hook del contexto


const URI = 'https://backend2-mhjh.onrender.com/api/productos/';
const URI_ADMIN = 'https://backend2-mhjh.onrender.com/api/administrador';
const URI_EMPLEADO = 'https://backend2-mhjh.onrender.com/api/empleado';

function Rproductos() {
    const {language} = useLanguage();
    const [CantidadR, setCantidad] = useState('');
    const [Material, setMaterial] = useState('');
    const [Colores, setColor] = useState('');
    const [id_administrador, setid_administrador] = useState('');
    const [id_Empleado, setid_Empleado] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [errors, setErrors] = useState({});
    const [administrador, setAdministrador] = useState([]);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false); 
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMateriales, setFilteredMateriales] = useState([]);
 

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
            { id: 10, tipo: 'Elastano' },
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

    const validate = async () => {
        const newErrors = {};
        if (!CantidadR || CantidadR <= 0) newErrors.CantidadR = language === 'es' ? 'La cantidad debe ser un número positivo.' : 'Quantity must be a positive number.';
        if (!Material) newErrors.Material = language === 'es' ? 'Selecciona un material.' : 'Select a material.';
        if (!Colores) newErrors.Colores = language === 'es' ? 'Selecciona un color.' : 'Select a color.';
        if (!id_Empleado) newErrors.id_Empleado = language === 'es' ? 'Selecciona un empleado.' : 'Select an employee.';
        if (!id_administrador) newErrors.id_administrador = language === 'es' ? 'Selecciona un administrador.' : 'Select an administrator.';

        // Validación para verificar duplicados
        try {
            const response = await axios.get(`${URI}?Material=${Material}&Colores=${Colores}&id_administrador=${id_administrador}&id_Empleado=${id_Empleado}`);
            if (response.data.length > 0) {
                newErrors.duplicado = language === 'es' ? 'Este producto ya está registrado con el mismo material, color, administrador y empleado.' : 'This product is already registered with the same material, color, administrator, and employee.';
            }
        } catch (error) {
            console.error('Error al verificar duplicados:', error);
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const store = async (e) => {
        e.preventDefault();
        if (!(await validate())) return;
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

    return (
        <div className="bg-slate-300 p-10 flex justify-center items-center min-h-screen">
            <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-2xl w-full">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">{language === 'es' ? 'Registrar Material' : 'Register Material'}</h2>
                <form onSubmit={store}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Selección de empleado */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-white mb-2" htmlFor="id_Empleado">{language === 'es' ? 'Empleado' : 'Employee'}</label>
                            <select
                                id="id_Empleado"
                                value={id_Empleado}
                                onChange={(e) => setid_Empleado(e.target.value)}
                                className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">{language === 'es' ? 'Selecciona un empleado' : 'Select an employee'}</option>
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
                            <label className="block text-white mb-2" htmlFor="Cantidad">{language === 'es' ? 'Cantidad' : 'Quantity'}</label>
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
                            <label className="block text-white mb-2" htmlFor="Material">{language === 'es' ? 'Material' : 'Material'}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={language === 'es' ? 'Buscar material' : 'Search material'}
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
                            <label className="block text-white mb-2" htmlFor="Color">{language === 'es' ? 'Color' : 'Color'}</label>
                            <select
                                id="Color"
                                value={Colores}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            >
                                <option value="">{language === 'es' ? 'Selecciona un color' : 'Select a color'}</option>
                                <option value="Rojo">{language === 'es' ? 'Rojo' : 'Red'}</option>
                                <option value="Azul">{language === 'es' ? 'Azul' : 'Blue'}</option>
                                <option value="Verde">{language === 'es' ? 'Verde' : 'Green'}</option>
                                <option value="Amarillo">{language === 'es' ? 'Amarillo' : 'Yellow'}</option>
                                <option value="Negro">{language === 'es' ? 'Morado' : 'Purple'}</option>
                                <option value="Negro">{language === 'es' ? 'Violeta' : 'Violet'}</option>
                                <option value="Negro">{language === 'es' ? 'Ocre' : 'Ochre'}</option>
                                <option value="Negro">{language === 'es' ? 'Cafe' : 'Brown'}</option>
                                <option value="Negro">{language === 'es' ? 'Verde Oscuro' : 'Dark Green'}</option>
                                <option value="Negro">{language === 'es' ? 'Blanco' : 'White'}</option>
                                <option value="Negro">{language === 'es' ? 'Beige' : 'Beige'}</option>
                                <option value="Negro">{language === 'es' ? 'Color hueso' : 'Bone color'}</option>
                                <option value="Negro">{language === 'es' ? 'Rosado' : 'Pink'}</option>
                            </select>
                            {errors.Colores && <p className="text-red-500 text-sm mt-1">{errors.Colores}</p>}
                        </div>

                        {/* Administrador */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-white mb-2" htmlFor="id_administrador">{language === 'es' ? 'Administrador' : 'Administrator'}</label>
                            <select
                                id="id_administrador"
                                value={id_administrador}
                                onChange={(e) => setid_administrador(e.target.value)}
                                className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            >
                                <option value="">{language === 'es' ? 'Selecciona un administrador' : 'Select an administrator'}</option>
                                {administrador.map((admin) => (
                                    <option key={admin.id_administrador} value={admin.id_administrador}>
                                        {admin.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.id_administrador && <p className="text-red-500 text-sm mt-1">{errors.id_administrador}</p>}
                        </div>
                    </div>

                    {/* Mensaje de error para duplicado */}
                    {errors.duplicado && <p className="text-red-500 text-sm mt-2">{errors.duplicado}</p>}

                    <button
                        type="submit"
                        className="w-full bg-indigo-500  text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {language === 'es' ? 'Registrar Producto' : 'Register Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Rproductos;
