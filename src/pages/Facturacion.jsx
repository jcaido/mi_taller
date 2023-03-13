import React from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Facturacion() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <NavBar
            pages={['INICIO', 'DATOS GENERALES', 'TALLER', 'ALMACÉN', 'CONTABILIDAD']}
            pagina="FACTURACION"
          />
        </Box>
      </Grid>
      <Outlet />
    </Grid>
  );
}

export default Facturacion;
