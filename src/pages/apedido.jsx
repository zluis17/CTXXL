import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URI = 'https://backend2-mhjh.onrender.com/api/pedidos/';
const URI_ADMIN = 'https://backend2-mhjh.onrender.com/api/administrador';

function RPedidos() {
    const [Cliente, setCliente] = useState('');
    const [Cantidad, setCantidad] = useState(1);
    const [Prenda, setPrenda] = useState('Uniformes');
    const [Tela, setTela] = useState('Algodón');
    const [Estampado, setEstampado] = useState('No');
    const [EspecificacionesEstampado, setEspecificacionesEstampado] = useState('');
    const [Talla, setTalla] = useState('S');
    const [Bordado, setBordado] = useState('No');
    const [PInicial, setPInicial] = useState(0);
    const [PFinal, setPFinal] = useState(8000);
    const [FechaEntrega, setFechaEntrega] = useState('');
    const [DireccionEntrega, setDireccionEntrega] = useState('Local');
    const [TelefonoContacto, setTelefonoContacto] = useState('');
    const [id_Empleado, setid_Empleado] = useState('');
    const [id_administrador, setid_administrador] = useState('');
    const [administrador, setAdministrador] = useState([]);
    const navigate = useNavigate();

    const fabricOptions = [
        'Algodón', 'Poliéster', 'Lana', 'Mezcla', 'Seda', 'Denim', 'Lino', 'Nylon', 
        'Spandex', 'Rayón', 'Twill', 'Velvet', 'Chiffon', 'Canvas', 'Silk', 'Acrylic'
    ];
    const deliveryOptions = ['Local', 'Domicilio 1', 'Domicilio 2', 'Otro'];

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
        const precioBase = 8000;
        const nuevoPrecioFinal = Cantidad * precioBase;
        setPFinal(nuevoPrecioFinal);
    }, [Cantidad]);

    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URI, {
                Cliente,
                Cantidad,
                Prenda,
                Tela,
                Estampado,
                EspecificacionesEstampado,
                Talla,
                Bordado,
                PInicial,
                PFinal,
                FechaEntrega,
                DireccionEntrega,
                TelefonoContacto,
                id_administrador,
                id_Empleado,
            });
            navigate('/admin/ipedidos');
        } catch (error) {
            console.error('Error al registrar el pedido:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <main className="flex-1 p-6 bg-gradient-to-r from-slate-200 to-slate-400 text-white bg-cover bg-no-repeat">
                <div className="flex justify-center items-center h-full">
                    <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Actualizar de Pedido</h2>
                        <form onSubmit={store} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm" htmlFor="Cliente">Cliente</label>
                                <input
                                    type="text"
                                    id="Cliente"
                                    value={Cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm" htmlFor="Cantidad">Cantidad</label>
                                <input
                                    type="number"
                                    id="Cantidad"
                                    value={Cantidad}
                                    onChange={(e) => setCantidad(Math.max(1, e.target.value))}
                                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm" htmlFor="Prenda">Prenda</label>
                                <select
                                    id="Prenda"
                                    value={Prenda}
                                    onChange={(e) => setPrenda(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    <option value="Uniformes">Uniformes</option>
                                    <option value="Camisetas">Camisetas</option>
                                    <option value="Chalecos">Chalecos</option>
                                    <option value="Chaquetas">Chaquetas</option>
                                    <option value="Afines">Afines</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm" htmlFor="Tela">Tela</label>
                                <select
                                    id="Tela"
                                    value={Tela}
                                    onChange={(e) => setTela(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    {fabricOptions.map((fabric) => (
                                        <option key={fabric} value={fabric}>{fabric}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm" htmlFor="FechaEntrega">Fecha de Entrega</label>
                                <input
                                    type="date"
                                    id="FechaEntrega"
                                    value={FechaEntrega}
                                    onChange={(e) => setFechaEntrega(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm" htmlFor="DireccionEntrega">Dirección de Entrega</label>
                                <select
                                    id="DireccionEntrega"
                                    value={DireccionEntrega}
                                    onChange={(e) => setDireccionEntrega(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    {deliveryOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-center space-x-4 mt-6">
                            <button
                                    type="button"
                                    onClick={() => navigate('/admin/ipedidos')}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-green-700 transition duration-200"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default RPedidos;
