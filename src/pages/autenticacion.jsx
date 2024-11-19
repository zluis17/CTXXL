import React, { useState } from 'react';

function Configuracion2FA() {
  const [qrCode, setQrCode] = useState(''); // Aquí cargarías el código QR generado desde el backend
  const [authCode, setAuthCode] = useState('');
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate2FA = () => {
    // Aquí enviarías el authCode al servidor para validar y activar 2FA
    if (authCode === '123456') { // Simulación de validación
      setIsActivated(true);
      alert('Autenticación en dos pasos activada');
    } else {
      alert('Código de autenticación incorrecto');
    }
  };

  // Simulamos un código QR que normalmente se generaría en el backend.
  const loadQrCode = () => {
    // Cargarías un código QR desde el servidor
    setQrCode('https://via.placeholder.com/150'); // Placeholder para el código QR
  };

  return (
    <div className="bg-slate-400 p-10 flex justify-center items-center min-h-screen">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          {isActivated ? 'Autenticación Activada' : 'Configurar Autenticación en Dos Pasos'}
        </h2>

        {!isActivated && (
          <>
            <div className="text-center mb-8">
              <p className="text-white mb-4">
                Escanea el siguiente código QR con tu aplicación de autenticación (como Google Authenticator):
              </p>
              <div className="flex justify-center">
                {qrCode ? (
                  <img src={qrCode} alt="QR Code para 2FA" className="w-32 h-32" />
                ) : (
                  <button
                    onClick={loadQrCode}
                    className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-300"
                  >
                    Generar Código QR
                  </button>
                )}
              </div>
            </div>

            {qrCode && (
              <div className="mb-8">
                <label className="block text-white mb-2">Introduce el código de la aplicación de autenticación</label>
                <input
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="w-full px-4 py-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Código de 6 dígitos"
                />
              </div>
            )}

            <div className="text-center">
              {qrCode && (
                <button
                  onClick={handleActivate2FA}
                  className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-300"
                >
                  Activar 2FA
                </button>
              )}
            </div>
          </>
        )}

        {isActivated && (
          <div className="text-center">
            <p className="text-white">¡Autenticación en dos pasos activada exitosamente!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Configuracion2FA;
