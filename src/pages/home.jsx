import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Icono de alerta
import '../index.css';
import axios from 'axios'; // Asegúrate de tener axios instalado
import {useLanguage} from '../pages/LanguageContext'


const URI = "https://backend2-mhjh.onrender.com/api/stock/";

function Home() {
    const { language } = useLanguage(); 
    const [tasks, setTasks] = useState([
        { id: 1, description: '', completed: false },
        { id: 2, description: '', completed: false },
        { id: 3, description: '', completed: false },
        { id: 4, description: '', completed: false }
    ]);

    const [stockAlerts, setStockAlerts] = useState({
        pedidos: 0,
        materiales: 0,
    });

   
    useEffect(() => {
        setTasks([
            {
                id: 1,
                description: language === 'es' 
                    ? 'Revisar inventario de pedidos' 
                    : 'Check orders inventory',
                completed: false
            },
            {
                id: 2,
                description: language === 'es' 
                    ? 'Atender solicitud del cliente Juan Pérez' 
                    : 'Attend request from client Juan Pérez',
                completed: false
            },
            {
                id: 3,
                description: language === 'es' 
                    ? 'Actualizar precios de nuevos productos' 
                    : 'Update prices of new products',
                completed: false
            },
            {
                id: 4,
                description: language === 'es' 
                    ? 'Enviar cotización a proveedor' 
                    : 'Send quotation to supplier',
                completed: false
            }
        ]);
    }, [language]); 

    useEffect(() => {
        const fetchStockAlerts = async () => {
            try {
                const response = await axios.get(URI); 
                setStockAlerts(response.data);
            } catch (error) {
                console.error('Error al obtener alertas de stock:', error);
            }
        };

        fetchStockAlerts();
    }, []); 

    const completeTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: true } : task
            )
        );
    };


    return (
        <div className="min-h-screen bg-slate-300">
            <div className="flex-grow ml-4 bg-slate-300 text-gray-300 p-8">
                <h2 className="text-3xl mb-6 text-black text-center">{language === 'es' ? 'Panel de Control':'Control panel'}</h2>

                {/* Sección de Tareas */}
                <section className="mb-8">
                    <h3 className="text-2xl mb-4 text-black">{language === 'es' ? 'Tareas Pendientes':'Pending tasks'}</h3>
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className={`p-4 rounded-md flex justify-between items-center ${task.completed ? 'bg-green-500' : 'bg-gray-700'}`}
                            >
                                <span className={`${task.completed ? 'line-through' : ''}`}>
                                    {task.description}
                                </span>
                                {!task.completed && (
                                    <button
                                        onClick={() => completeTask(task.id)}
                                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {language === 'es' ? 'Completar':'Complete'}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Sección de Alertas de Inventario */}
                {stockAlerts.pedidos <= 5 || stockAlerts.materiales <= 5 ? (
                    <section className="mb-8">
                        <h3 className="text-2xl mb-4 text-red-500">{language === 'es'?'Alertas de Inventario':'Inventory alerts'}</h3>
                        <div className="space-y-4">
                            {stockAlerts.pedidos <= 5 && (
                                <div className="flex items-center p-4 bg-red-600 text-white rounded-md">
                                    <FaExclamationTriangle className="mr-2" />
                                    <span>
                                    {language === 'es' 
                                        ? `Alerta: Solo quedan ${stockAlerts.pedidos} pedidos en el inventario.` 
                                        : `Alert: Only ${stockAlerts.pedidos} orders left in inventory.`}
                                    </span>
                                </div>
                            )}
                            {stockAlerts.materiales <= 5 && (
                                <div className="flex items-center p-4 bg-yellow-600 text-white rounded-md">
                                    <FaExclamationTriangle className="mr-2" />
                                    <span>
                                    {language === 'es' 
                                        ? `Alerta: Stock de materiales bajo (${stockAlerts.materiales} unidades restantes).` 
                                        : `Alert: Material stock is low (${stockAlerts.materiales} units remaining).`}
                                    </span>
                                    </div>
                            )}
                        </div>
                    </section>
                ) : (
                    <section className="mb-8">
                        <h3 className="text-2xl mb-4 text-green-500">Todo en orden</h3>
                        <div className="flex items-center p-4 bg-green-600 text-white rounded-md">
                            <span>No hay alertas de stock. ¡Todo está funcionando bien!</span>
                        </div>
                    </section>
                )}

                {/* Sección de resumen de negocio */}
                <section>
                    <h3 className="text-2xl mb-4 text-black">{language === 'es' ? 'Resumen del Negocio':'Summary of the business'}</h3>
                    <p className="bg-gray-700 p-4 rounded-md">
                    <p>
                    {language === 'es' 
                        ? 'El negocio está funcionando de manera estable. Revisa las alertas de stock y asegúrate de completar las tareas pendientes. Mantén actualizada la información de tus proveedores y sigue mejorando la gestión de los pedidos y materiales.'
                        : 'The business is running smoothly. Check stock alerts and make sure to complete pending tasks. Keep your supplier information up to date and continue improving the management of orders and materials.'}
                    </p>

                    </p>
                </section>
            </div>
        </div>
    );
};

export default Home;