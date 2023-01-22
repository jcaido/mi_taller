import React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import InformacionGeneral from './InformacionGeneral';
import InformacionVehiculo from './InformacionVehiculo';
import InformacionPropietario from './InformacionPropietario';
import InformacionPiezasReparacion from './InformacionPiezasReparacion';
import InformacionManoDeObra from './InformacionManoDeObra';
import InformacionCierre from './InformacionCierre';

function InformacionOrdenReparacion() {
  return (
    <>
      <Grid item md={12}>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="h7" gutterBottom>INFORMACION ORDEN DE REPARACION</Typography>
        </Box>
      </Grid>
      <Grid item md={12}>
        <InformacionGeneral />
      </Grid>
      <Grid item md={12}>
        <InformacionVehiculo />
      </Grid>
      <Grid item md={12}>
        <InformacionPropietario />
      </Grid>
      <Grid item md={12}>
        <InformacionPiezasReparacion />
      </Grid>
      <Grid item md={12}>
        <InformacionManoDeObra />
      </Grid>
      <Grid item md={12}>
        <InformacionCierre />
      </Grid>

    </>
  );
}

export default InformacionOrdenReparacion;
