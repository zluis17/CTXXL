import React, { useState } from 'react';

const ContactModal = ({ setModalVisible }) => {
    const [alert, setAlert] = useState({ message: '', type: '' });

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "2dd3afc5-d146-4b4b-8cde-179526cfcfde");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            }).then((res) => res.json());

            if (res.success) {
                setAlert({ message: "¡Mensaje enviado exitosamente!", type: "success" });
            } else {
                setAlert({ message: "Error al enviar el mensaje, por favor intente nuevamente.", type: "error" });
            }
        } catch (error) {
            setAlert({ message: "Ocurrió un error en el envío, intente nuevamente más tarde.", type: "error" });
        }

        // Limpiar alerta después de 5 segundos
        setTimeout(() => {
            setAlert({ message: '', type: '' });
        }, 5000);
    };

    const closeModal = () => {
        setModalVisible(false); // Cerrar el modal usando la función de props
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
            onClick={closeModal} // Cerrar modal al hacer clic en el fondo
        >
            <div
                className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()} // Evitar cerrar el modal al hacer clic en su contenido
            >
                <h2 className="text-3xl text-center mb-6 text-black">Formulario De Contacto</h2>

                {/* Mostrar alertas */}
                {alert.message && (
                    <div className={`mb-4 p-4 text-center rounded ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {alert.message}
                    </div>
                )}

                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-2 gap-8">
                        {/* Primera columna */}
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-black">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    minLength="3"
                                    className="w-full p-2 bg-transparent border-b-2 border-purple-600 text-white rounded focus:outline-none focus:ring focus:ring-purple-300 transition duration-200 hover:border-purple-700"
                                    placeholder="Ingrese Su Nombre"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-black">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-2 bg-transparent border-b-2 border-purple-600 text-white rounded focus:outline-none focus:ring focus:ring-purple-300 transition duration-200 hover:border-purple-700"
                                    placeholder="Ingresa tu E-mail"
                                    required
                                />
                            </div>
                        </div>

                        {/* Segunda columna */}
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-black">Tu Mensaje:</label>
                                <textarea
                                    name="message"
                                    minLength="10"
                                    className="w-full p-2 bg-transparent border-b-2 border-purple-600 text-white rounded focus:outline-none focus:ring focus:ring-purple-300 transition duration-200 hover:border-purple-700"
                                    placeholder="Aquí va Tu Mensaje"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md mr-2 hover:bg-gray-700 transition duration-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-300"
                        >
                            Envía el Mensaje
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;
