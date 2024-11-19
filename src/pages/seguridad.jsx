import React, { useState } from 'react';

function Seguridad() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enable2FA, setEnable2FA] = useState(false);

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log('Seguridad guardada:', { newPassword, enable2FA });
    alert('Cambios de seguridad guardados');
  };

  return (
    <div className="bg-slate-400 min-h-screen flex justify-center items-center p-6">
      <div className="bg-slate-900 rounded-xl shadow-lg max-w-3xl w-full p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Seguridad</h2>
        <p className="text-whitemb-8">Administra las configuraciones de acceso y autenticación de tu cuenta.</p>

        <form className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Cambiar contraseña</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-1">Contraseña actual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-1">Nueva contraseña</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-1">Confirmar nueva contraseña</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Métodos adicionales de autenticación</h3>
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={(e) => setEnable2FA(e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              Activar autenticación en dos pasos (2FA)
            </label>
          </div>

          <div className="text-right mt-6">
            <button
              type="button"
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
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

export default Seguridad;
