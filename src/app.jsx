import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <Route path="/facturacion" element={<Facturacion />} />
        <Route path="/contabilidad" element={<Contabilidad />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
