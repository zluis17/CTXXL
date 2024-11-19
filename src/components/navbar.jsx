import React, { useState, useEffect } from 'react';
import { RiNotification3Line } from 'react-icons/ri';
import ConfigDesplegable from './ConfigDesplegable';
import { MdSettings } from 'react-icons/md';
import { useLanguage } from '../pages/LanguageContext'; 
import '../index.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [configOpen, setConfigOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false); // Estado inicial oculto

    const { language, changeLanguage } = useLanguage();

    const toggleNotifications = () => setNotificationsOpen(prev => !prev);
    const closeNotifications = () => setNotificationsOpen(false);

    const openConfig = () => {
        setConfigOpen(true);
        setDropdownOpen(false);
    };
    const closeConfig = () => setConfigOpen(false);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    const user = {
        profileImage: 'https://via.placeholder.com/150',
        role: 'Administrador',
    };

    const notifications = [
        { id: 1, message: "Nueva solicitud de acceso." },
        { id: 2, message: "Cambio de contraseña exitoso." },
        { id: 3, message: "Nuevo mensaje en tu bandeja." }
    ];

    // Control de visibilidad de la Navbar
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (e.clientY < 50) {
                setIsNavbarVisible(true); // Mostrar si el mouse está cerca de la parte superior
            } else {
                setIsNavbarVisible(false); // Ocultar si no está en la parte superior
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            {/* Navbar con visibilidad dinámica */}
            <nav
                className={`bg-gray-800 p-4 fixed w-full top-0 transition-transform duration-300 ${
                    isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="container mx-auto flex justify-end items-center space-x-4">
                    <div className="relative">
                        <button
                            onClick={toggleNotifications}
                            className="text-purple-200 hover:text-purple-100 transition duration-300 relative"
                        >
                            <RiNotification3Line className="w-6 h-6" />
                            {notifications.length > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                    {notifications.length}
                                </span>
                            )}
                        </button>
                        {notificationsOpen && (
                            <div
                                className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50"
                                onMouseLeave={closeNotifications}
                            >
                                <div className="p-4 border-b border-gray-200 font-semibold">
                                    Notificaciones
                                </div>
                                <ul className="py-1">
                                    {notifications.length > 0 ? (
                                        notifications.map(notification => (
                                            <li key={notification.id} className="px-4 py-2 hover:bg-purple-200">
                                                {notification.message}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-2 text-gray-500">
                                            Sin notificaciones
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <select
                            value={language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded"
                        >
                            <option value="es">{language === 'es' ? 'Español' : 'Spanish'}</option>
                            <option value="en">{language === 'es' ? 'Inglés' : 'English'}</option>
                        </select>
                    </div>
                    <div className="relative">
                        <button onClick={toggleDropdown} className="bg-transparent border-none cursor-pointer">
                            <img 
                                src={user.profileImage} 
                                alt="Perfil" 
                                className="w-12 h-12 rounded-md object-cover"
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                                <div className="p-4 border-b border-gray-200 text-center font-semibold">
                                    {user.role}
                                </div>
                                <ul className="py-1">
                                    <li
                                        className="flex items-center px-4 py-2 hover:bg-purple-200 cursor-pointer"
                                        onClick={openConfig}
                                    >
                                        <MdSettings className="mr-2" />
                                        Configuración
                                    </li>
                                    <Link
                                        to="/salida"
                                        className="px-4 py-2 text-center text-gray-600 cursor-pointer hover:text-black"
                                        onClick={closeDropdown}
                                    >
                                        Cerrar Sesion
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <ConfigDesplegable isOpen={configOpen} closeConfig={closeConfig} />
        </>
    );
};

export default Navbar;
