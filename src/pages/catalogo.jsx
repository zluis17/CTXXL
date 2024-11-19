import React, { useState } from "react";

const Catalogo = () => {
  const productos = [
    { id: 1, name: "Producto 1", price: 12.99, description: "Descripción del Producto 1." },
    { id: 2, name: "Producto 2", price: 15.99, description: "Descripción del Producto 2." },
    { id: 3, name: "Producto 3", price: 9.99, description: "Descripción del Producto 3." },
    { id: 4, name: "Producto 4", price: 18.99, description: "Descripción del Producto 4." },
    { id: 5, name: "Producto 5", price: 14.99, description: "Descripción del Producto 5." },
    { id: 6, name: "Producto 6", price: 10.99, description: "Descripción del Producto 6." },
    { id: 7, name: "Producto 7", price: 11.99, description: "Descripción del Producto 7." },
    { id: 8, name: "Producto 8", price: 11.99, description: "Descripción del Producto 8." },
    { id: 9, name: "Producto 9", price: 11.99, description: "Descripción del Producto 9." },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (producto) => {
    setSelectedProduct(producto); // Almacena el producto seleccionado
  };

  const closeDescription = () => {
    setSelectedProduct(null); // Cierra la descripción
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Título */}
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Catálogo de Productos
      </h1>

      {/* Banner pequeño */}
      <div className="bg-purple-100 text-purple-700 p-4 rounded-lg text-center mb-8 shadow-md">
        <p className="text-lg font-medium">
          Encuentra los mejores productos al mejor precio. ¡Compra ahora!
        </p>
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            onClick={() => handleProductClick(producto)} // Maneja el clic en el producto
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
          >
            {/* Espacio para Imagen */}
            <div className="bg-gray-300 w-full h-40 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Imagen</span>
            </div>
            {/* Nombre */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {producto.name}
            </h2>
            {/* Precio */}
            <p className="text-purple-600 font-bold text-lg">${producto.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Modal de Descripción */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={closeDescription}
            >
              X
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <p className="text-purple-600 font-bold text-lg">
              Precio: ${selectedProduct.price.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogo;
