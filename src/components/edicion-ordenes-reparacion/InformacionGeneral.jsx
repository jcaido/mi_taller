import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionGeneral() {
  const { state } = useContext(EdicionOrdenesContext);
  return (
    <Box>
      Fecha de apertura:
      { state.ordenReparacionPorId.fechaApertura }
      Descripcion de los trabajos:
      { state.ordenReparacionPorId.descripcion }
    </Box>
  );
}

export default InformacionGeneral;
