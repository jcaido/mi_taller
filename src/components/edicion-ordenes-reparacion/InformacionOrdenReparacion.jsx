import React from 'react';
import { Grid } from '@mui/material';
import InformacionGeneral from './InformacionGeneral';
import InformacionVehiculo from './InformacionVehiculo';
import InformacionPropietario from './InformacionPropietario';
import InformacionPiezasReparacion from './InformacionPiezasReparacion';
import InformacionManoDeObra from './InformacionManoDeObra';
import InformacionCierre from './InformacionCierre';

function InformacionOrdenReparacion() {
  return (
    <>
      <Grid item md={3} m={1}>
        <InformacionGeneral />
      </Grid>
      <Grid item md={2} m={1}>
        <InformacionVehiculo />
      </Grid>
      <Grid item md={2} m={1}>
        <InformacionPropietario />
      </Grid>
      <Grid item md={2} m={1}>
        <InformacionManoDeObra />
      </Grid>
      <Grid item md={2} m={1}>
        <InformacionCierre />
      </Grid>
      <Grid item md={6} m={1}>
        <InformacionPiezasReparacion />
      </Grid>
    </>
  );
}

export default InformacionOrdenReparacion;
