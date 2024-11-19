import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CgAdd } from "react-icons/cg";
import { VscEdit } from "react-icons/vsc";
import { FaUser, FaIdCard, FaBirthdayCake, FaEnvelope, FaMobileAlt } from "react-icons/fa";
import REmpleados from '../pages/rempleados';

const URI = 'https://backend2-mhjh.onrender.com/api/Empleado/';

function IEmpleados() {
  const [Empleados, setEmpleados] = useState([]);
  const [showTooltip, setShowTooltip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [numRecords, setNumRecords] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = async () => {
    try {
      const res = await axios.get(URI);
      setEmpleados(res.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const filteredEmpleados = Empleados.filter(Empleado =>
    Object.values(Empleado).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredEmpleados.length / numRecords);
  const currentEmpleados = filteredEmpleados.slice((currentPage - 1) * numRecords, currentPage * numRecords);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen bg-gray-800">
      <main className="flex-1 flex flex-col p-10 text-white bg-slate-300">
        <div className="w-3/4 mt-20">
          <div className="w-full flex justify-between">
            <h1 className="text-4xl font-bold text-black flex items-center space-x-2">
              <FaUser className="text-orange-500" />
              <span>Inventario Empleados</span>
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 space-x-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full max-w-xs p-3 rounded-lg border-2 border-purple-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="relative">
            <button
              onClick={() => setModalVisible(true)}
              onMouseEnter={() => setShowTooltip('add')}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <CgAdd className="text-4xl text-purple-600 hover:text-purple-700 transition duration-300" />
            </button>
            {showTooltip === 'add' && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-purple-600 text-white text-lg rounded shadow-lg z-10">
                Registrar Nuevo
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto border border-purple-200 shadow-2xl shadow-purple-800 mt-6 rounded-lg">
          <table className="w-full bg-gray-900">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-3 text-center">Nombre</th>
                <th className="p-3 text-center">Tipo de Documento</th>
                <th className="p-3 text-center">Fecha de Nacimiento</th>
                <th className="p-3 text-center">Correo</th>
                <th className="p-3 text-center">Celular</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center text-white">
              {currentEmpleados.length > 0 ? (
                currentEmpleados.map((Empleado) => (
                  <tr key={Empleado.id_Empleado} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                    <td className="p-3"><FaUser className="inline-block mr-2 text-orange-400" />{Empleado.Nombre}</td>
                    <td className="p-3"><FaIdCard className="inline-block mr-2 text-teal-400" />{Empleado.TipoD}</td>
                    <td className="p-3"><FaBirthdayCake className="inline-block mr-2 text-yellow-400" />{Empleado.FechaN}</td>
                    <td className="p-3"><FaEnvelope className="inline-block mr-2 text-blue-400" />{Empleado.Correo}</td>
                    <td className="p-3"><FaMobileAlt className="inline-block mr-2 text-green-400" />{Empleado.celular}</td>
                    <td className="p-3">
                      <Link
                        to={`/admin/aempleados/${Empleado.id_Empleado}`}
                        onMouseEnter={() => setShowTooltip(Empleado.id_Empleado)}
                        onMouseLeave={() => setShowTooltip(null)}
                        className="text-2xl text-purple-600 hover:text-purple-400 transition duration-300"
                      >
                        <VscEdit />
                      </Link>
                      {showTooltip === Empleado.id_Empleado && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-purple-600 text-white text-sm rounded">
                          Editar
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center bg-gray-900">
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
            <span className="text-sm">Mostrando {currentEmpleados.length} de {filteredEmpleados.length} empleados</span>
            <div className="flex items-center space-x-2">
              <label htmlFor="numRecords" className="text-sm">Registros por página:</label>
              <select
                id="numRecords"
                value={numRecords}
                onChange={(e) => {
                  setNumRecords(parseInt(e.target.value));
                  setCurrentPage(1); // Reiniciar a la primera página al cambiar el número de registros
                }}
                className="p-2 bg-gray-800 text-white rounded-md border border-purple-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center p-4 bg-gray-900 text-white">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-2 rounded-md ${currentPage === index + 1 ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-purple-500 hover:text-white'} transition duration-300`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {modalVisible && <REmpleados setModalVisible={setModalVisible} />}
      </main>
    </div>
  );
}

export default IEmpleados;
