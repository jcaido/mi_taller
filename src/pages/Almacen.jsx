import React from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Almacen() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <NavBar
            pages={['INICIO', 'DATOS GENERALES', 'TALLER', 'FACTURACION', 'CONTABILIDAD']}
            pagina="ALMACÉN"
          />
        </Box>
      </Grid>
      <Outlet />
    </Grid>
  );
}
