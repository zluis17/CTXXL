import React, { useState, useEffect } from 'react';
import '../index.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const URI = "https://backend2-mhjh.onrender.com/api/productos/";

function AProductos() {
  const [CantidadR, setCantidadR] = useState("");
  const [Material, setMaterial] = useState("");
  const [Colores, setColores] = useState("");
  const [id_administrador, setIdAdministrador] = useState("");
  const [id_Empleado, setIdEmpleado] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await axios.get(`${URI}${id}`);
        setCantidadR(res.data.CantidadR);
        setMaterial(res.data.Material);
        setColores(res.data.Colores);
        setIdAdministrador(res.data.id_administrador);
        setIdEmpleado(res.data.id_Empleado);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URI}${id}`, {
        CantidadR,
        Material,
        Colores,
        id_administrador,
        id_Empleado,
      });
      navigate("/admin/iproducto");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="flex h-screen">
        <main className="flex-1 p-6 bg-gradient-to-r from-slate-200 to-slate-400 text-white bg-cover bg-no-repeat">
        
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-2xl ">
            <h2 className="text-3xl font-bold mb-8 text-center">Actualizar Producto</h2>
            <form onSubmit={updateProduct}>
              <div className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="w-full">
                    <label className="block mb-2" htmlFor="CantidadR">Cantidad</label>
                    <input
                      type="number"
                      id="CantidadR"
                      value={CantidadR}
                      onChange={(e) => setCantidadR(e.target.value)}
                      className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2" htmlFor="Material">Material</label>
                    <input
                      type="text"
                      id="Material"
                      value={Material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-2" htmlFor="Colores">Color</label>
                    <input
                      type="text"
                      id="Colores"
                      value={Colores}
                      onChange={(e) => setColores(e.target.value)}
                      className="w-full px-4 py-3 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                 
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                <Link to="/admin/iproducto">
                    <button
                      type="button"
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
                      >
                      Cancelar
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AProductos;
