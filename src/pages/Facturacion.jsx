import React from 'react';
import NavBar from '../components/NavBar';

function Facturacion() {
  return (
    <div>
      <NavBar
        pages={['INICIO', 'DATOS GENERALES', 'TALLER', 'ALMACÉN', 'CONTABILIDAD']}
        pagina="FACTURACION"
      />
    </div>
  );
}

export default Facturacion;
