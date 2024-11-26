import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from './LanguageContext'; // Importar el hook del contexto


const URI = 'https://backend2-mhjh.onrender.com/api/pedidos/';
const URI_ADMIN = 'https://backend2-mhjh.onrender.com/api/administrador';
const URI_EMPLEADO = 'https://backend2-mhjh.onrender.com/api/empleado';


function RPedidos() {
    const {language} = useLanguage();
    const [Cliente, setCliente] = useState('');
    const [Cantidad, setCantidad] = useState(1);
    const [Prenda, setPrenda] = useState('Uniformes Hombre');  // "Uniformes Hombre" es el valor por defecto
    const [Tela, setTela] = useState('Algodón');
    const [Estampado, setEstampado] = useState('No');
    const [EspecificacionesEstampado, setEspecificacionesEstampado] = useState('');
    const [Talla, setTalla] = useState('S');
    const [PInicial, setPinicial] = useState('');
    const [Bordado, setBordado] = useState('No');
    const [PFinal, setPFinal] = useState(0);
    const [id_Empleado, setid_Empleado] = useState('');
    const [id_administrador, setid_administrador] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [administrador, setAdministrador] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Para el campo de búsqueda de Tela

    const navigate = useNavigate();

    // Precios base según tipo de prenda y talla
    const precioBasePrenda = {
        "Camisetas": {
            "XS": 12000, "S": 15000, "M": 18000, "L": 20000, "XL": 22000, "XXL": 24000
        },
        "Pantalones": {
            "XS": 20000, "S": 25000, "M": 30000, "L": 35000, "XL": 40000, "XXL": 45000
        },
        "Chalecos": {
            "XS": 25000, "S": 30000, "M": 35000, "L": 40000, "XL": 45000, "XXL": 50000
        },
        "Chaquetas": {
            "XS": 35000, "S": 40000, "M": 45000, "L": 50000, "XL": 55000, "XXL": 60000
        }
    };

    // Tiempos de ajuste cuando se cambia el tipo de prenda
    useEffect(() => {
        const nuevoPrecioBase = precioBasePrenda[Prenda.split(' ')[0]]?.[Talla] || 0;
        const nuevoPrecioFinal = nuevoPrecioBase * Cantidad;
        setPFinal(nuevoPrecioFinal);
    }, [Cantidad, Prenda, Talla]);

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
    }, []);

    const formatCOP = (valor) => {
        return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    };

    const store = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI, {
                Cliente,
                Cantidad,
                Prenda,
                Tela,
                Estampado,
                EspecificacionesEstampado,
                Talla,
                Bordado,
                PFinal,
                PInicial,
                id_administrador,
                id_Empleado,
            });
            console.log('Respuesta de la API:', response.data);
            navigate('/admin/ipedidos');
        } catch (error) {
            console.error('Error al registrar el pedido:', error);
        }
    };

    // Opciones de Tela (materiales)
    const opcionesTela = [
        "Algodón", "Poliéster", "Lana", "Mezcla", "Seda", "Lino", "Denim"
    ];

    // Filtrar las opciones de tela según el término de búsqueda
    const filteredTela = opcionesTela.filter((material) =>
        material.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-300 p-4 sm:p-10 flex justify-center items-center min-h-screen">
            <div className="bg-slate-900 p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-5xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">
                    {language === 'es' ? 'Registro de Pedido' : 'Order Registration'}
                </h2>
                <form onSubmit={store}>
                    {/* Contenedor principal del formulario */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Sección 1: Información del cliente */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-white mb-2" htmlFor="Cliente">
                                    {language === 'es' ? 'Cliente' : 'Client'}
                                </label>
                                <input
                                    type="text"
                                    id="Cliente"
                                    value={Cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2" htmlFor="id_Empleado">
                                    {language === 'es' ? 'Empleado' : 'Employee'}
                                </label>
                                <select
                                    id="id_Empleado"
                                    value={id_Empleado}
                                    onChange={(e) => setid_Empleado(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    <option value="">{language === 'es' ? 'Seleccione Empleado' : 'Select Employee'}</option>
                                    {empleados.map((empleado) => (
                                        <option key={empleado.id_Empleado} value={empleado.id_Empleado}>
                                            {empleado.Nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-white mb-2" htmlFor="id_administrador">
                                    {language === 'es' ? 'Administrador' : 'Administrator'}
                                </label>
                                <select
                                    id="id_administrador"
                                    value={id_administrador}
                                    onChange={(e) => setid_administrador(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    <option value="">{language === 'es' ? 'Seleccione Administrador' : 'Select Administrator'}</option>
                                    {administrador.map((admin) => (
                                        <option key={admin.id_administrador} value={admin.id_administrador}>
                                            {admin.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Sección 2: Especificaciones del pedido */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white mb-2" htmlFor="Cantidad">
                                        {language === 'es' ? 'Cantidad' : 'Quantity'}
                                    </label>
                                    <input
                                        type="number"
                                        id="Cantidad"
                                        value={Cantidad}
                                        onChange={(e) => setCantidad(Math.max(1, e.target.value))}
                                        className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-2" htmlFor="Prenda">
                                        {language === 'es' ? 'Prenda' : 'Garment'}
                                    </label>
                                    <select
                                        id="Prenda"
                                        value={Prenda}
                                        onChange={(e) => setPrenda(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    >
                                        <option value="Camisetas">{language === 'es' ? 'Camisetas' : 'T-Shirts'}</option>
                                        <option value="Pantalones">{language === 'es' ? 'Pantalones' : 'Pants'}</option>
                                        <option value="Chalecos">{language === 'es' ? 'Chalecos' : 'Vests'}</option>
                                        <option value="Chaquetas">{language === 'es' ? 'Chaquetas' : 'Jackets'}</option>
                                        <option value="Uniformes Hombre">{language === 'es' ? 'Uniforme Hombre' : 'Men\'s Uniform'}</option>
                                        <option value="Uniformes Mujer">{language === 'es' ? 'Uniforme Mujer' : 'Women\'s Uniform'}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-white mb-2" htmlFor="Talla">
                                    {language === 'es' ? 'Talla' : 'Size'}
                                </label>
                                <select
                                    id="Talla"
                                    value={Talla}
                                    onChange={(e) => setTalla(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white mb-2" htmlFor="Tela">
                                    {language === 'es' ? 'Tela' : 'Fabric'}
                                </label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={language === 'es' ? 'Buscar material' : 'Search material'}
                                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        {/* Sección 3: Detalles financieros */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-white mb-2" htmlFor="PFinal">
                                    {language === 'es' ? 'Precio Final' : 'Final Price'}
                                </label>
                                <input
                                    type="text"
                                    id="PFinal"
                                    value={formatCOP(PFinal)}
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2" htmlFor="PInicial">
                                    {language === 'es' ? 'Abono' : 'Initial Payment'}
                                </label>
                                <input
                                    type="number"
                                    id="PInicial"
                                    value={PInicial}
                                    onChange={(e) => setPinicial(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botón de acción */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {language === 'es' ? 'Registrar Pedido' : 'Register Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RPedidos;
