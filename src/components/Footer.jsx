import React from 'react';
import {useLanguage} from '../pages/LanguageContext'
// import from 

const Footer = ({ setModalVisible }) => {
    const {language} = useLanguage();

    return (
        <footer className="w-full bg-purple-700 text-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center text-center">
                    <p className="text-sm mb-2 sm:mb-0">
                        <button 
                            onClick={() => setModalVisible(true)} 
                            className="text-white underline focus:outline-none hover:text-purple-300 transition duration-200"
                        >
                            {language === 'es' ? 'Contactanos':'Contact us'}
                        </button>
                    </p>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} {language === 'es' 
                        ? 'TextileUniforms. Todos los derechos reservados.'
                        :'TextileUniforms. All rights reserved.'}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
