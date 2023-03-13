import React from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Taller() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <NavBar
            pages={['INICIO', 'DATOS GENERALES', 'ALMACÉN', 'FACTURACION', 'CONTABILIDAD']}
            pagina="TALLER"
          />
        </Box>
      </Grid>
      <Outlet />
    </Grid>

  );
}

export default Taller;
