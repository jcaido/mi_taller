import React from 'react';
import NavBar from '../components/NavBar';

const Taller = () => {

    return (
        <div>
            <NavBar
                pages = {['INICIO', 'DATOS GENERALES', 'FACTURACION', 'CONTABILIDAD']}
                pagina = "TALLER"
            />
        </div>
    )
}

export default Taller
