import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './pages/LanguageContext';

import Navbar2 from './components/Navbar2';
import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import React, { useState } from 'react'; 
import Index from './pages/index';
import SignIn from './pages/singIn';
import Login from './pages/login';
import Home from './pages/home';
import PerfilDetalle from './pages/perfilDetalle';
import PerfilEditar from './pages/perfilEditar';
import Iproducto from './pages/iproducto';
import IEmpleados from './pages/iempleados';
import IPedidos from './pages/ipedidos';
import Rproductos from './pages/regiMaterial';
import RPedidos from './pages/regiPedido';
import REmpleados from './pages/regiEmpleado';
import EditarPedido from './pages/apedido';
import EditarEmpleados from './pages/aempleados';
import EditarProducto from './pages/aproducto';
import Contact from './pages/Contact';
import EmpleadoHome from './pages/homeE';
import EmpleadoSidebar from './components/SidebarE';
import EmpleadoPedidos from './pages/EpedidoR';
import EmpleadoMaterial from './pages/EmRegiProduct'; 
import EmpleadoIpedido from './pages/ipedidosE';
import EmpleadoIproduct from './pages/iproductosE';
import EmpleadoActualizarPedido from './pages/apedidoE' ;
import EmpleadoActualizarMaterial from './pages/aproductosE';
import ConfigNotificaciones from './pages/notificaciones';
import ConfigSeguridad from './pages/seguridad';
import ConfigGeneral from './pages/general';
import Salida from './pages/salida';
import Catalogo from './pages/catalogo';

function App() {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal

  return (
    <LanguageProvider>
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* Rutas principales */}
        <Routes>
          <Route path="/" element={<><Navbar2 /><Index /></>} />
          <Route path="/index" element={<><Navbar2 /><Index /></>} />
          <Route path="/singIn" element={<><Navbar2 /><SignIn /></>} />
          <Route path="/login" element={<><Navbar2 /><Login /></>} />

          {/* Rutas para Administrador */}
          <Route path="/admin/*" element={
            <div className="flex flex-grow">
              <Sidebar />
              <div className="content flex-grow bg-black">
                <Navbar />
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="catalogo" element={<Catalogo />} />
                  <Route path="perfilDetalle" element={<PerfilDetalle />} />
                  <Route path="perfilEditar" element={<PerfilEditar />} />
                  <Route path="ipedidos" element={<IPedidos />} />
                  <Route path="iproducto" element={<Iproducto />} />
                  <Route path="aproducto/:id" element={<EditarProducto />} />
                  <Route path="apedido/:id_Pedido" element={<EditarPedido />} />
                  <Route path="aempleados/:id_Empleado" element={<EditarEmpleados />} />
                  <Route path="iempleado" element={<IEmpleados />} />
                  <Route path="regiMaterial" element={<Rproductos />} />
                  <Route path="regiPedido" element={<RPedidos />} />
                  <Route path="regiEmpleado" element={<REmpleados />} />
                  <Route path="configNotificaciones" element={<ConfigNotificaciones />} />
                  <Route path="configSeguridad" element={<ConfigSeguridad />} />
                  <Route path="configGeneral" element={<ConfigGeneral />} />
                </Routes>
              </div>
            </div>
          } />

          {/* Rutas para Empleados */}
          <Route path="/empleado/*" element={
            <div className="flex flex-grow">
              <EmpleadoSidebar setModalVisible={setModalVisible} /> {/* Pasar setModalVisible */}
              <div className="content flex-grow bg-black">
                <Navbar />
                <Routes>
                  <Route path="homeE" element={<EmpleadoHome />} />
                  <Route path="catalogo" element={<Catalogo />} />
                  <Route path="perfilDetalle" element={<PerfilDetalle />} />
                  <Route path="perfilEditar" element={<PerfilEditar />} />
                  <Route path="ipedidosE" element={<EmpleadoIpedido />} />
                  <Route path="iproductoE" element={<EmpleadoIproduct />} />
                  <Route path="EmpleadoMaterial/" element={<EmpleadoMaterial />} />  
                  <Route path="EmpleadoPedido" element={<EmpleadoPedidos />} />  
                  <Route path="ActualizarPedido/:id_Pedido" element={<EmpleadoActualizarPedido />} />  
                  <Route path="ActualizarMaterial/:id" element={<EmpleadoActualizarMaterial />} />  
                </Routes>
              </div>
            </div>
          } />

        <Route path="/salida" element={<Salida />} />



          {/* Ruta de contacto */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        <Footer setModalVisible={setModalVisible} /> {/* Pasar setModalVisible al Footer */}

        {/* Modal para contacto */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <Contact setModalVisible={setModalVisible} /> {/* Mostrar el modal de contacto */}
          </div>
        )}
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;
