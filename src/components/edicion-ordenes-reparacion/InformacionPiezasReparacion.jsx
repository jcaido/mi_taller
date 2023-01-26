import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import TablaPiezas from './TablaPiezas';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionPiezasReparacion() {
  const { state } = useContext(EdicionOrdenesContext);

  return (
    <Box>
      <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
        PIEZAS IMPUTADAS
      </Typography>
      { state.ordenReparacionPorId.piezasReparacion.length === 0
        ? <p>No hay piezas</p>
        : <TablaPiezas />}
    </Box>
  );
}

export default InformacionPiezasReparacion;
