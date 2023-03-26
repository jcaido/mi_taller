import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavigationButtonInformes from '../NavigationButtonInformes';

export default function InformesFacturacion() {
  const navigate = useNavigate();

  const handleClickBotonRegresar = () => {
    navigate('/facturacion/opciones');
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
          <Button variant="text">LISTADO DE FACTURAS DE PROVEEDORES</Button>
          <Button variant="text">LISTADO DE FACTURAS DE UN PROVEEDOR</Button>
        </Box>
      </Grid>
    </Grid>
  );
}
