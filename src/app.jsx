import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Almacen from './pages/Almacen';
import AlmacenOpciones from './pages/AlmacenOpciones';
import Contabilidad from './pages/Contabilidad';
import DatosGenerales from './pages/DatosGenerales';
import Facturacion from './pages/Facturacion';
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
          <Route path="proveedores" element={<p>proveedores</p>} />
          <Route path="piezas" element={<p>piezas</p>} />
          <Route path="entradas" element={<p>entradas</p>} />
          <Route path="informes" element={<p>informes</p>} />
        </Route>
        <Route path="/facturacion" element={<Facturacion />} />
        <Route path="/contabilidad" element={<Contabilidad />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
