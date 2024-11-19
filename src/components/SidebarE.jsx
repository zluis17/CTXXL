import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import {
  FaClipboardList, FaBoxOpen, FaHome, FaBars, FaTimes
} from 'react-icons/fa';
import LogoCTXY from '../img/LogoCTXY.jpg';

const Sidebar = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [notifications] = useState({ pedidos: 2, productos: 1 });

  const toggleInventory = () => setIsInventoryOpen(!isInventoryOpen);
  const toggleRegister = () => setIsRegisterOpen(!isRegisterOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      {/* Botón de hamburguesa (sólo en móviles) */}
      <button
        onClick={toggleSidebar}
        className="p-4 text-white bg-gray-800 focus:outline-none md:hidden rounded-lg" // Bordes redondeados
      >
        {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-transform duration-300 transform rounded-r-lg ${ // Bordes redondeados en el lado derecho del sidebar
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        {/* Logo */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-purple-400">
            <Link to="/empleado/homeE">
              <img src={LogoCTXY} alt="LogoCTXY" className="h-10 rounded-lg" /> {/* Logo con bordes redondeados */}
            </Link>
          </h2>
        </div>

        <nav className="flex flex-col p-6 space-y-2">
          {/* Enlace directo a Home */}
          <Link
            to="/empleado/homeE"
            className={`flex items-center p-3 rounded-lg hover:bg-purple-600 transition duration-300 ${
              location.pathname === '/empleado/homeE' ? 'bg-purple-600' : ''
            }`}
          >
            <FaHome className="mr-2" /> Inicio
          </Link>
          <Link
            to="/empleado/catalogo"
            className={`flex items-center p-3 rounded-lg hover:bg-purple-600 transition duration-300 ${
              location.pathname === '/admin/home' ? 'bg-purple-600' : ''
            }`}
          >
            <FaHome className="mr-2" /> Catalogo Precio
          </Link>

          {/* Menú Inventarios */}
          <div>
            <button
              onClick={toggleInventory}
              className={`w-full text-left p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 flex justify-between items-center ${
                location.pathname.startsWith('/empleado/ipedidosE') || location.pathname.startsWith('/empleado/iproductoE') || location.pathname.startsWith('/empleado/iempleado') ? 'bg-purple-600' : ''
              }`}
            >
              Inventarios
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${isInventoryOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Menú colapsable de Inventarios */}
            <div
              className={`pl-6 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isInventoryOpen ? 'max-h-96' : 'max-h-0'
              }`}
              style={{ maxHeight: isInventoryOpen ? '300px' : '0px' }}
            >
              <Link
                to="/empleado/ipedidosE"
                className={`flex items-center p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 ${
                  location.pathname === '/empleado/ipedidosE' ? 'bg-purple-600' : ''
                }`}
              >
                <FaClipboardList className="mr-2" /> Inventario Pedidos
                {notifications.pedidos > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.pedidos}
                  </span>
                )}
              </Link>
              <Link
                to="/empleado/iproductoE"
                className={`flex items-center p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 ${
                  location.pathname === '/empleado/iproductosE' ? 'bg-purple-600' : ''
                }`}
              >
                <FaBoxOpen className="mr-2" /> Inventario Material
                {notifications.productos > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.productos}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Menú Registros */}
          <div>
            <button
              onClick={toggleRegister}
              className={`w-full text-left p-3 rounded-lg hover:bg-purple-600 transition duration-300 flex justify-between items-center ${
                location.pathname.startsWith('/empleado/EmpleadoPedido') || location.pathname.startsWith('/empleado/EmpleadoMaterial') || location.pathname.startsWith('/app/rempleado') ? 'bg-purple-600' : ''
              }`}
            >
              Registros
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${isRegisterOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Menú colapsable de Registros */}
            <div
              className={`pl-6 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isRegisterOpen ? 'max-h-96' : 'max-h-0'
              }`}
              style={{ maxHeight: isRegisterOpen ? '300px' : '0px' }}
            >
              <Link
                to="/empleado/EmpleadoPedido"
                className="block p-3 rounded-lg hover:bg-purple-600 transition duration-300"
              >
                Registro Pedido
              </Link>
              <Link
                to="/empleado/EmpleadoMaterial"
                className="block p-3 rounded-lg hover:bg-purple-600 transition duration-300"
              >
                Registro Material
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Overlay (solo se muestra en móviles cuando el sidebar está abierto) */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
