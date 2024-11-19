// ConfigDesplegable.js
import React from 'react';
import { Link } from 'react-router-dom';
import { MdSettings, MdNotifications, MdSecurity } from 'react-icons/md';
import { RiLogoutCircleRLine } from 'react-icons/ri';

const ConfigDesplegable = ({ isOpen, closeConfig }) => {
    return (
        <div 
            className={`fixed inset-y-0 right-0 w-64 bg-slate-400 text-black transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50 shadow-lg`}
        >
            <div className="p-4 border-b border-gray-200 font-semibold flex justify-between items-center">
                <span>Configuración</span>
                <button onClick={closeConfig} className="text-gray-500 hover:text-gray-700">X</button>
            </div>
            <ul className="py-4">
                {/* Opción de Perfil y Configuración */}
                <li className="px-4 py-2 hover:bg-purple-200 cursor-pointer">
                    <Link to="/admin/perfilDetalle" onClick={closeConfig}>
                        <MdSettings className="inline mr-2" />
                        Perfil y Configuración
                    </Link>
                </li>

                {/* Opción de Notificaciones */}
                <li className="px-4 py-2 hover:bg-purple-200 cursor-pointer">
                    <Link to="/admin/configNotificaciones" onClick={closeConfig}>
                        <MdNotifications className="inline mr-2" />
                        Notificaciones
                    </Link>
                </li>

                {/* Opción de Configuración General */}
                <li className="px-4 py-2 hover:bg-purple-200 cursor-pointer">
                    <Link to="/admin/configGeneral" onClick={closeConfig}>
                        <MdSettings className="inline mr-2" />
                        Configuración General
                    </Link>
                </li>

                {/* Opción de Seguridad */}
                <li className="px-4 py-2 hover:bg-purple-200 cursor-pointer">
                    <Link to="/admin/configSeguridad" onClick={closeConfig}>
                        <MdSecurity className="inline mr-2" />
                        Seguridad
                    </Link>
                </li>

                {/* Opción de Cerrar Sesión */}
                <li className="px-4 py-2 hover:bg-purple-200 cursor-pointer">
                    <Link to="/salida" onClick={closeConfig}>
                        <RiLogoutCircleRLine className="inline mr-2" />
                        Cerrar Sesión
                    </Link>
                </li>
            </ul>
        </div>
    );
};
    
export default ConfigDesplegable;
