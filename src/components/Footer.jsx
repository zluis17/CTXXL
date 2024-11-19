import React from 'react';

const Footer = ({ setModalVisible }) => {
    return (
        <footer className="w-full bg-purple-700 text-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center text-center">
                    <p className="text-sm mb-2 sm:mb-0">
                        <button 
                            onClick={() => setModalVisible(true)} 
                            className="text-white underline focus:outline-none hover:text-purple-300 transition duration-200"
                        >
                            Contacto
                        </button>
                    </p>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} TextileUniforms. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
