import React, { useState } from 'react';
import { useLanguage } from './LanguageContext'; // Importar el hook del contexto
// Componente Configuración General
function ConfiguracionGeneral({ isAdmin }) {
  const [companyName, setCompanyName] = useState('Ejemplo Corp');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [email, setEmail] = useState('contacto@ejemplocorp.com');
  const [address, setAddress] = useState('123 Calle Ejemplo');
  const [logo, setLogo] = useState(null);
  const {language} = useLanguage();

  const handleSave = () => {
    if (!isAdmin) return; // Solo permite guardar si es administrador
    alert('Configuración general guardada');
  };

  const handleLogoChange = (e) => {
    if (!isAdmin) return; // Solo permite cambiar el logo si es administrador
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">{language === 'es' ? 'Configuración General':'General configuration'}</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Nombre de la compañía':'Company name'}</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => isAdmin && setCompanyName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? '':''}Ingrese el nombre de la compañía
            readOnly={!isAdmin}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Número de teléfono':'Number Phone'}</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => isAdmin && setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? 'Ingrese el número de teléfono':''}
            readOnly={!isAdmin}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Correo electrónico':'Email Address'}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => isAdmin && setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? 'Ingrese el correo electrónico':'Enter your email address'}
            readOnly={!isAdmin}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Dirección':'Address'}</label>
          <textarea
            value={address}
            onChange={(e) => isAdmin && setAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? 'Ingrese la dirección':'Enter the address'}
            readOnly={!isAdmin}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Logotipo de la compañía':'Company logo'}</label>
          <input
            type="file"
            onChange={handleLogoChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isAdmin}
          />
          {logo && (
            <img src={logo} alt="Logo Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />
          )}
        </div>

        {isAdmin && (
          <div className="text-right">
            <button
              type="button"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleSave}
            >
              {language === 'es' ? 'Guardar cambios' : 'Save changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

// Componente Notificaciones con campos adicionales
function Notificaciones() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [frequency, setFrequency] = useState('Diariamente');
  const [notificationEmail, setNotificationEmail] = useState('admin@ejemplo.com');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const {language} = useLanguage();

  const handleSaveNotifications = async () => {
    const formData = new FormData();
    formData.append("access_key", "2dd3afc5-d146-4b4b-8cde-179526cfcfde");
    formData.append("email", notificationEmail);
    formData.append("subject", "Configuración de Notificaciones Actualizada");
    formData.append(
      "message",
      `Notificaciones por Correo: ${emailNotifications ? 'Activadas' : 'Desactivadas'}\n` +
      `Notificaciones por SMS: ${smsNotifications ? 'Activadas' : 'Desactivadas'}\n` +
      `Frecuencia de Notificación: ${frequency}`
    );

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
        setAlert({ message: "Notificaciones actualizadas y correo enviado exitosamente.", type: "success" });
      } else {
        setAlert({ message: "Error al enviar las notificaciones. Intente de nuevo.", type: "error" });
      }
    } catch (error) {
      setAlert({ message: "Error de conexión. Intente más tarde.", type: "error" });
    }

    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 5000);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">{language === 'es' ? 'Notificaciones':'Notifications'}</h2>

      {alert.message && (
        <div className={`mb-4 p-4 text-center rounded ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {alert.message}
        </div>
      )}

      <form className="space-y-6">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="mr-2"
            />
           {language === 'es' ? 'Notificaciones por correo electrónico':'Notifications by e-mail'} 
          </label>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="mr-2"
            />
            {language === 'es' ? 'Notificaciones por SMS':'SMS notifications'}
          </label>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Frecuencia de Notificaciones':'Frequency of notifications'}</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>{language === 'es' ? 'Diariamente':'Daily'}</option>
            <option>{language === 'es' ? 'Semanalmente':'Weekly'}</option>
            <option>{language === 'es' ? 'Mensualmente':'Monthly'}</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Correo Electrónico de Notificación':'e-mail address notification'}</label>
          <input
            type="email"
            value={notificationEmail}
            onChange={(e) => setNotificationEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? 'Ingrese el correo electrónico':''}
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleSaveNotifications}
          >
              {language === 'es' ? 'Guardar cambios' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Componente Seguridad con campos adicionales
function Seguridad() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const {language} = useLanguage();

  const handleChangePassword = () => {
    if (currentPassword && newPassword && securityQuestion && securityAnswer) {
      alert('Configuración de seguridad guardada');
    } else {
      alert('Por favor complete todos los campos');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">{language === 'es' ? 'Seguridad':'Security'}</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-white mb-2">{language === 'es' ? 'Contraseña actual':'Current Password'}</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? 'Ingrese la contraseña actual':'Enter the current password'}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Nueva contraseña':'New password'}</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? 'Ingrese la nueva contraseña':'Enter the new password'}
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
              className="mr-2"
            />
            {language === 'es' ? 'Activar autenticación de dos factores':'Enable two factor authentication'}
          </label>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Pregunta de seguridad':'security question'}</label>
          <input
            type="text"
            value={securityQuestion}
            onChange={(e) => setSecurityQuestion(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? 'Ingrese una pregunta de seguridad':'Enter a security question'}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">{language === 'es' ? 'Respuesta de seguridad':'security answer'}</label>
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'es' ? 'Ingrese la respuesta de seguridad':'Enter the security response'}
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleChangePassword}
          >
              {language === 'es' ? 'Guardar cambios' : 'Save changes'}
              </button>
        </div>
      </form>
    </div>
  );
}
function CambioIdioma() {
  const [timezone, setTimezone] = useState('America/Bogota');
  const { language, changeLanguage } = useLanguage(); // Usar el idioma del contexto

  const handleSave = () => {
    // Lógica para guardar la configuración (puedes agregar la lógica para guardarlo en el servidor)
    console.log('Configuración guardada:', { language, timezone });
    alert(language === 'es' ? 'Configuración general guardada' : 'General settings saved');
  };

  return (
    <div className="p-6 space-y-">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          {language === 'es' ? 'Cambiar Lenguaje' : 'Change language'}
        </h2>
        <form className="space-y-6">
          <div className="mb-4">
            <label className="block text-white mb-2">
              {language === 'es' ? 'Idioma' : 'Language'}
            </label>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)} // Cambiar el idioma
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">
              {language === 'es' ? 'Zona Horaria' : 'Timezone'}
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="America/Bogota">Bogotá</option>
              <option value="America/New_York">Nueva York</option>
              <option value="Europe/Madrid">Madrid</option>
            </select>
          </div>

          <div className="text-right">
          <button
              type="button"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleSave}
            >
              {language === 'es' ? 'Guardar cambios' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
  );
}
// Componente principal de configuración con navegación
function Configuracion() {
  const [currentSection, setCurrentSection] = useState('company');
  const isAdmin = true; // Cambia esto a false para probar como usuario sin permisos
  const {language} = useLanguage();
  const renderSection = () => {
    switch (currentSection) {
      case 'company':
        return <ConfiguracionGeneral isAdmin={isAdmin} />;
      case 'notifications':
        return <Notificaciones />;
      case 'security':
        return <Seguridad />;
      case 'languages':
        return <CambioIdioma />;
      default:
        return <p>{language === 'es' ? 'Selecciona una sección':''}</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 font-semibold rounded-md ${currentSection === 'company' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setCurrentSection('company')}
        >
           {language === 'es' ? 'Compañía':'Company'}
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-md ${currentSection === 'notifications' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setCurrentSection('notifications')}
        >
          {language === 'es' ? 'Notificaciones':'Notifications'}
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-md ${currentSection === 'security' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setCurrentSection('security')}
        >
         {language === 'es' ? 'Seguridad':'Security'} 
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-md ${currentSection === 'languages-' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setCurrentSection('languages')}
        >
         {language === 'es' ? 'Cambiar Lenguaje':'Change language'} 
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {renderSection()}
      </div>
    </div>
  );
}




export default Configuracion;
