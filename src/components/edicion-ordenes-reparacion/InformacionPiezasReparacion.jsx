import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionPiezasReparacion() {
  const { state } = useContext(EdicionOrdenesContext);

  return (
    <Box>
      { state.ordenReparacionPorId.piezasReparacion.length === 0
        ? <p>No hay piezas</p>
        : state.ordenReparacionPorId.piezasReparacion.map(
          (datosPieza) => (
            <p key={datosPieza.id}>
              {datosPieza.pieza.referencia}
              {datosPieza.pieza.nombre}
              {datosPieza.cantidad}
            </p>
          ),
        )}
    </Box>
  );
}

export default InformacionPiezasReparacion;
