import React from 'react';
import NavBar from '../components/NavBar';

function Contabilidad() {
  return (
    <div>
      <NavBar
        pages={['INICIO', 'DATOS GENERALES', 'TALLER', 'FACTURACION']}
        pagina="CONTABILIDAD"
      />
    </div>
  );
}

export default Contabilidad;
