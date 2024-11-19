import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import '../index.css'; 
import LogoCTXY from '../img/LogoCTXY.jpg';

const Navbar2 = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo e ícono */}
                <div className="flex items-center">
                    <Link to={"/index"}>
                        <img src={LogoCTXY} alt="Logo" className="h-10 mr-2" />
                    </Link>
                    <h1 className="text-white text-xl font-bold">Textiles la Y</h1>
                </div>

                {/* Menú de escritorio */}
                <div className="hidden md:flex space-x-4 items-center">
                    <Link to="/SingIn" className="text-white hover:text-purple-300 flex items-center">
                        <FaSignInAlt className="mr-1" />
                        Iniciar Sesión
                    </Link>
                    <Link to="/Login" className="text-white hover:text-purple-300 flex items-center">
                        <FaUserPlus className="mr-1" />
                        Registrarse
                    </Link>
                </div>

                {/* Menú hamburguesa para móviles */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Menú desplegable para móviles */}
            {isOpen && (
                <div className="md:hidden bg-gray-900">
                    <Link
                        to="/SingIn"
                        className="block text-white hover:bg-purple-600 p-2"
                        onClick={toggleMenu}
                    >
                        <FaSignInAlt className="mr-1" />
                        Iniciar Sesión
                    </Link>
                    <Link
                        to="/Login"
                        className="block text-white hover:bg-purple-600 p-2"
                        onClick={toggleMenu}
                    >
                        <FaUserPlus className="mr-1" />
                        Registrarse
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar2;
