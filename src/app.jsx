import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Almacen from './pages/Almacen';
import AlmacenEntradas from './pages/AlmacenEntradas';
import AlmacenInformesOrdenes from './pages/AlmacenInformesOrdenes';
import AlmacenOpciones from './pages/AlmacenOpciones';
import AlmacenPiezas from './pages/AlmacenPiezas';
import AlmacenProveedores from './pages/AlmacenProveedores';
import Contabilidad from './pages/Contabilidad';
import DatosGenerales from './pages/DatosGenerales';
import Facturacion from './pages/Facturacion';
import FacturacionClientes from './pages/FacturacionClientes';
import FacturacionInformes from './pages/FacturacionInformes';
import FacturacionOpciones from './pages/FacturacionOpciones';
import FacturacionProveedores from './pages/FacturacionProveedores';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Taller from './pages/Taller';
import TallerAutorizacionOrdenes from './pages/TallerAutorizacionOrdenes';
import TallerEdicionOrdenes from './pages/TallerEdicionOrdenes';
import TallerInformesOrdenes from './pages/TallerInformesOrdenes';
import TallerOpciones from './pages/TallerOpciones';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datos/*" element={<DatosGenerales />} />
        <Route path="/taller/" element={<Taller />}>
          <Route path="opciones" element={<TallerOpciones />} />
          <Route path="autorizacion-ordenes" element={<TallerAutorizacionOrdenes />} />
          <Route path="edicion-ordenes" element={<TallerEdicionOrdenes />} />
          <Route path="informes-ordenes" element={<TallerInformesOrdenes />} />
        </Route>
        <Route path="/almacen/" element={<Almacen />}>
          <Route path="opciones" element={<AlmacenOpciones />} />
          <Route path="proveedores" element={<AlmacenProveedores />} />
          <Route path="piezas" element={<AlmacenPiezas />} />
          <Route path="entradas" element={<AlmacenEntradas />} />
          <Route path="informes" element={<AlmacenInformesOrdenes />} />
        </Route>
        <Route path="/facturacion/" element={<Facturacion />}>
          <Route path="opciones" element={<FacturacionOpciones />} />
          <Route path="proveedores" element={<FacturacionProveedores />} />
          <Route path="clientes" element={<FacturacionClientes />} />
          <Route path="informes" element={<FacturacionInformes />} />
        </Route>
        <Route path="/contabilidad" element={<Contabilidad />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
