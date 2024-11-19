import React, { useState } from 'react';

function Notificaciones() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSave = () => {
    // Aquí podrías agregar la lógica para guardar los cambios en el servidor
    console.log('Preferencias guardadas:', { emailNotifications, smsNotifications, pushNotifications });
    alert('Preferencias de notificación guardadas');
  };

  return (
    <div className="bg-slate-400 p-10 flex justify-center items-center min-h-screen">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Notificaciones</h2>
        <form>
          <div className="mb-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="mr-2"
              />
              Notificaciones por correo electrónico
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
                className="mr-2"
              />
              Notificaciones por SMS
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="mr-2"
              />
              Notificaciones push
            </label>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-300"
              onClick={handleSave}
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Notificaciones;
