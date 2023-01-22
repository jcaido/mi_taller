import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionManoDeObra() {
  const { state } = useContext(EdicionOrdenesContext);

  return (
    <Box>
      {state.ordenReparacionPorId.horas ? (
        <p>
          {state.ordenReparacionPorId.horas}
          {' '}
          horas
        </p>
      ) : <p>No hay mano de obra imputada</p>}
    </Box>
  );
}

export default InformacionManoDeObra;
