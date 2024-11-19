import React, { useState, useMemo } from 'react';
import logoFacebook from '../img/facebook-512.webp';
import logoGoogle from '../img/google_logo-google_icongoogle-512.webp';
import logoTwitter from '../img/1690643591twitter-x-logo-png.webp';
import logoInstagram from '../img/instagram-logo-instagram-icon-transparent-free-png.webp';
import backgroundImag from '../img/imagen1.jpg';
import '../index.css';

const users = [
  { id: "U001", firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password123", birthDate: "1985-07-15", phone: "555-1234", address: "123 Main St, Anytown USA" },
  { id: "U002", firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", password: "password456", birthDate: "1990-03-22", phone: "555-5678", address: "456 Oak Rd, Somewhere City" },
  // Otros usuarios...
];

const SearchIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ProveedorDetalle = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      Object.values(user).some(value =>
        value.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-purple-500">CTXL</h2>
        </div>
        <nav className="flex flex-col p-6 space-y-2">
          <a href="#home" className="p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300">
            Inicio
          </a>
          <a href="#profile" className="p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300">
            Perfil
          </a>
          <div>
            <button className="w-full text-left p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 flex justify-between items-center">
              Inventarios
              <svg className="w-4 h-4 transform transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div>
            <button className="w-full text-left p-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 flex justify-between items-center">
              Registro
              <svg className="w-4 h-4 transform transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </nav>
        {/* Social Media Icons */}
        <div className="flex justify-center p-6 space-x-4 mt-auto">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-black transition duration-300">
            <img src={logoFacebook} alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-black transition duration-300">
            <img src={logoInstagram} alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-black transition duration-300">
            <img src={logoTwitter} alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-black transition duration-300">
            <img src={logoGoogle} alt="Google" className="w-6 h-6" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-10 bg-gray-900 text-white bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backgroundImag})` }}>
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
          <h1 className="white-space:nowrap text-4xl font-bold">Lista Proveedores</h1>            
          <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-md border-none bg-[#8B5CF6] text-white focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none hover:bg-[#7E22CE]"
              />
            </div>
          </div>
          <table className=" w-full bg-black text-white border rounded-lg shadow-lg">
            <thead>
              <tr className="bg-purple-700 border-b border-bg-black text-2xl">
                <th className="text-white">ID</th>
                <th className="text-white">Nombre</th>
                <th className="text-white">Apellido</th>
                <th className="text-white">Correo</th>
                <th className="text-white">Contraseña</th>
                <th className="text-white">Fecha de Nacimiento</th>
                <th className="text-white">Teléfono</th>
                <th className="text-white">Dirección</th>
              </tr>
            </thead>
            <tbody>
           {filteredUsers.map((user, index) => (
            <tr key={user.id} className="bg-black hover:bg-[#7E22CE] text-white">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td  className="p-3">{user.email}</td>
                  <td className="p-3">{user.password}</td>
                  <td className="p-3">{user.birthDate}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.address}</td>
              </tr>
            ))}
            </tbody>

          </table>
        </div>
      </main>
    </div>
  );
};

export default ProveedorDetalle;
