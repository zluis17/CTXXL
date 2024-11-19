import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CgAdd } from "react-icons/cg";
import { VscEdit } from "react-icons/vsc";
import { FaBoxes, FaUserAlt, FaTshirt, FaPalette, FaTags, FaRuler, FaDollarSign } from "react-icons/fa"; // Iconos para el título y filas
import RPedidos from './rpedidos'; 
import Apedidos from './apedido'; 
import { Link } from 'react-router-dom';

const URI = 'https://backend2-mhjh.onrender.com/api/pedidos/';

function IPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [showTooltip, setShowTooltip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  
  const [numRecords, setNumRecords] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = async () => {
    try {
      const res = await axios.get(URI);
      setPedidos(res.data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  const filteredPedidos = pedidos.filter(pedido =>
    Object.values(pedido).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredPedidos.length / numRecords);
  const startIndex = (currentPage - 1) * numRecords;
  const currentPedidos = filteredPedidos.slice(startIndex, startIndex + numRecords);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-slate-500 flex h-screen overflow-hidden">
      <main className="flex-1 flex flex-col p-10 bg-slate-300 text-white">
        <div className="w-3/4 mt-20">
          {/* Título con icono */}
          <h1 className="text-4xl font-bold text-black flex items-center space-x-2">
            <FaBoxes className="text-orange-500" />
            <span>Inventario de Pedidos</span>
          </h1>
        </div>

        <div className="my-8 flex justify-between items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar por cliente, prenda..."
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
              <CgAdd className='text-4xl text-purple-600 hover:text-purple-700 transition duration-300' />
            </button>
            {showTooltip === 'add' && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-purple-600 text-white text-lg rounded shadow-lg z-10">
                Registrar Nuevo
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto bg-gray-900 border border-purple-200 shadow-lg shadow-purple-600/100 rounded-lg">
          <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
            <span className="text-sm">Mostrando {Math.min(numRecords, filteredPedidos.length)} de {filteredPedidos.length} pedidos</span>
            <div className="flex items-center space-x-2">
              <label htmlFor="numRecords" className="text-sm">Registros por página:</label>
              <select
                id="numRecords"
                value={numRecords}
                onChange={(e) => {
                  setNumRecords(parseInt(e.target.value));
                  setCurrentPage(1); 
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

          <table className="min-w-full text-sm text-left text-gray-400">
            <thead className="bg-purple-700 text-white uppercase">
              <tr>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Prenda</th>
                <th className="px-6 py-3">Tela</th>
                <th className="px-6 py-3">Estampado</th>
                <th className="px-6 py-3">Cantidad</th>
                <th className="px-6 py-3">Talla</th>
                <th className="px-6 py-3">Bordado</th>
                <th className="px-6 py-3">Precio Inicial</th>
                <th className="px-6 py-3">Precio Final</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentPedidos.length > 0 ? (
                currentPedidos.map((pedido) => (
                  <tr 
                    key={pedido.id_Pedido} 
                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="px-6 py-4"><FaUserAlt className="inline-block mr-2 text-blue-400" />{pedido.Cliente}</td>
                    <td className="px-6 py-4"><FaTshirt className="inline-block mr-2 text-green-400" />{pedido.Prenda}</td>
                    <td className="px-6 py-4"><FaPalette className="inline-block mr-2 text-red-400" />{pedido.Tela}</td>
                    <td className="px-6 py-4"><FaTags className="inline-block mr-2 text-yellow-400" />{pedido.Estampado}</td>
                    <td className="px-6 py-4"><FaBoxes className="inline-block mr-2 text-orange-400" />{pedido.Cantidad}</td>
                    <td className="px-6 py-4"><FaRuler className="inline-block mr-2 text-purple-400" />{pedido.Talla}</td>
                    <td className="px-6 py-4"><FaTags className="inline-block mr-2 text-teal-400" />{pedido.Bordado}</td>
                    <td className="px-6 py-4"><FaDollarSign className="inline-block mr-2 text-green-400" />{pedido.PInicial}</td>
                    <td className="px-6 py-4"><FaDollarSign className="inline-block mr-2 text-green-400" />{pedido.PFinal}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/empleado/ActualizarPedido/${pedido.id_Pedido}`}
                        className="text-2xl text-purple-600 hover:text-purple-400 transition duration-300"
                        onClick={() => setEditModalVisible(true)}
                      >
                        <VscEdit />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-6 py-4 text-center">
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginación con números de página */}
          <div className="flex justify-center items-center p-4 bg-gray-900 text-white">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`mx-1 px-3 py-2 rounded-md ${currentPage === pageNumber ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-purple-500 hover:text-white'} transition duration-300`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>

        {modalVisible && (
          <RPedidos setModalVisible={setModalVisible} />
        )}
        
        {editModalVisible && ( 
          <Apedidos setModalVisible={setEditModalVisible} />
        )}
      </main>
    </div>
  );
}

export default IPedidos;
