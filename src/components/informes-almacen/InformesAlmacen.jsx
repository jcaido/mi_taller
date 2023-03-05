import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonInfoOrdenes from '../informes-ordenes-reparacion/NavigationButtonInfoOrdenes';
import InventarioActualAlmacenPDF from './InventarioActualAlmacenPDF';

export default function InformesAlmacen() {
  const [tablaInventarioActual, setTablaInventarioActual] = useState(false);

  const handleClickInventarioActual = () => {
    setTablaInventarioActual(true);
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonInfoOrdenes />
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box mt={2}>
          <Button variant="text" onClick={handleClickInventarioActual}>INVENTARIO ACTUAL DE PIEZAS EN ALMACEN</Button>
        </Box>
      </Grid>
      <Grid item md={9}>
        {tablaInventarioActual ? <InventarioActualAlmacenPDF /> : null}
      </Grid>
    </Grid>
  );
}
