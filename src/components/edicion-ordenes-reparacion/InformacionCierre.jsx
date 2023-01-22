import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionCierre() {
  const { state } = useContext(EdicionOrdenesContext);

  return (
    <Box>
      { state.ordenReparacionPorId.cerrada ? (
        <p>
          Fecha de cierre:
          {state.ordenReparacionPorId.fechaCierre}
        </p>
      ) : <p>Orden de reparacion abierta</p> }
    </Box>
  );
}

export default InformacionCierre;
