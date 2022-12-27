import React from 'react';
import NavBar from '../components/NavBar';

const Facturacion = () => {
    return (
        <div>
            <NavBar
                pages = {['INICIO', 'DATOS GENERALES', 'TALLER', 'CONTABILIDAD']}
                pagina = "FACTURACION"
            />
        </div>
    )
}

export default Facturacion
