import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionVehiculo() {
  const { state } = useContext(EdicionOrdenesContext);
  return (
    <Box>
      Matricula:
      { state.ordenReparacionPorId.vehiculo.matricula }
      Marca:
      { state.ordenReparacionPorId.vehiculo.marca }
      Modelo:
      { state.ordenReparacionPorId.vehiculo.modelo }
      Color:
      { state.ordenReparacionPorId.vehiculo.color }
      Kilometros:
      { state.ordenReparacionPorId.kilometros }
    </Box>
  );
}

export default InformacionVehiculo;
