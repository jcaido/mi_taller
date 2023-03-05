import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonInformes from '../NavigationButtonInformes';
import InventarioActualAlmacenPDF from './InventarioActualAlmacenPDF';

export default function InformesAlmacen() {
  const navigate = useNavigate();

  const [tablaInventarioActual, setTablaInventarioActual] = useState(false);

  const handleClickInventarioActual = () => {
    setTablaInventarioActual(true);
  };

  const handleClickBotonRegresar = () => {
    navigate('/almacen/opciones');
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonInformes botonRegresar={handleClickBotonRegresar} />
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
