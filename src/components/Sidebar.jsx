import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import {
  FaClipboardList, FaBoxOpen, FaUserTie, FaHome, FaBars, FaTimes
} from 'react-icons/fa';
import LogoCTXY from '../img/LogoCTXY.jpg';
import {useLanguage} from '../pages/LanguageContext'

const Sidebar = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const {language} = useLanguage();
  const [notifications, setNotifications] = useState({ pedidos: 2, productos: 1 });

  const handleNotificationClick = (type) => {
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [type]: 0,
    }));
  };
  

  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <button
        onClick={toggleSidebar}
        className="p-4 text-white bg-gray-800 focus:outline-none md:hidden"
      >
        {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        <div className="p-6">
          <h2 className="text-3xl font-bold text-purple-500">
            <Link to="/admin/home">
              <img src={LogoCTXY} alt="LogoCTXY" className="h-10" />
            </Link>
          </h2>
        </div>

        <nav className="flex flex-col p-6 space-y-2">
          <Link
            to="/admin/home"
            className={`flex items-center p-3 rounded-lg hover:bg-purple-600 transition duration-300 ${
              location.pathname === '/admin/home' ? 'bg-purple-600' : ''
            }`}
          >
            <FaHome className="mr-2" /> {language === 'es' ? 'Inicio' : 'Home'}
          
          </Link>
          <Link
            to="/admin/catalogo"
            className={`flex items-center p-3 rounded-lg hover:bg-purple-600 transition duration-300 ${
              location.pathname === '/admin/catalogo' ? 'bg-purple-600' : ''
            }`}
          >
            <FaHome className="mr-2" /> {language === 'es' ? 'Catálogo ' : 'Price Catalog'}
          </Link>

          <div>
            <button
              onClick={toggleInventory}
              className={`w-full text-left p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 flex justify-between items-center ${
                location.pathname.startsWith('/admin/ipedidos') || location.pathname.startsWith('/admin/iproducto') || location.pathname.startsWith('/app/iempleado') ? 'bg-purple-600' : ''
              }`}
            >
              {language === 'es' ? 'Inventarios' : 'Inventory'}
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

            <div
              className={`pl-6 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isInventoryOpen ? 'max-h-96' : 'max-h-0'
              }`}
              style={{ maxHeight: isInventoryOpen ? '300px' : '0px' }}
            >
              <Link
                to="/admin/ipedidos"
                className={`flex items-center p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 ${
                  location.pathname === '/admin/ipedidos' ? 'bg-purple-600' : ''
                }`}
                onClick={() => handleNotificationClick('pedidos')}
              >
                <FaClipboardList className="mr-2" /> Inventario Pedidos
                {notifications.pedidos > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.pedidos}
                  </span>
                )}
              </Link>
              <Link
                to="/admin/iproducto"
                className={`flex items-center p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 ${
                  location.pathname === '/admin/iproducto' ? 'bg-purple-600' : ''
                }`}
                onClick={() => handleNotificationClick('productos')}
              >
                <FaBoxOpen className="mr-2" />{language === 'es' ? 'Inventario Material' : 'Material Inventory'}
                {notifications.productos > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.productos}
                  </span>
                )}
              </Link>
              <Link
                to="/admin/iempleado"
                className={`flex items-center p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 ${
                  location.pathname === '/admin/iempleado' ? 'bg-purple-600' : ''
                }`}
              >
                <FaUserTie className="mr-2" /> {language === 'es' ? 'Inventario Empleados' : 'Employees Inventory'}
              </Link>
            </div>
          </div>

          <div>
            <button
              onClick={toggleRegister}
              className={`w-full text-left p-3 rounded-lg hover:bg-purple-600 transition duration-300 flex justify-between items-center ${
                location.pathname.startsWith('/admin/rpedidos') || location.pathname.startsWith('/app/rproductos') || location.pathname.startsWith('/app/rempleado') ? 'bg-purple-600' : ''
              }`}
            >
              {language === 'es' ? 'Registros' : 'Registers'}
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

            <div
              className={`pl-6 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isRegisterOpen ? 'max-h-96' : 'max-h-0'
              }`}
              style={{ maxHeight: isRegisterOpen ? '300px' : '0px' }}
            >
              <Link
                to="/admin/regiPedido"
                className="block p-3 rounded-lg hover:bg-purple-600 transition duration-300"
              >
                {language === 'es' ? 'Registro Pedido' : 'Order Register'}
              </Link>
              <Link
                to="/admin/regiMaterial"
                className="block p-3 rounded-lg hover:bg-purple-600 transition duration-300"
              >
                {language === 'es' ? 'Registro Material' : 'Material Register'}
              </Link>
              <Link
                to="/admin/regiEmpleado"
                className="block p-3 rounded-lg hover:bg-purple-600 transition duration-300"
              >
               {language === 'es' ? 'Registro Empleados' : 'Employee Register'}
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
