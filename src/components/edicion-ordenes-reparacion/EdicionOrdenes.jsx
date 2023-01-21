import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonEdiOrdenes from './NavigationButtonEdiOrdenes';
import BuscarOrdenReparacionPorIdForm from '../autorizacion-ordenes-reparacion/forms/BuscarOrdenReparacionPorIdForm';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';
import InformacionOrdenReparacion from './InformacionOrdenReparacion';

function EdicionOrdenes() {
  const {
    state,
    ObtenerOrdenReparacionPorIdParaCompletar,
    cerrarFormsPiezasMO,
  } = useContext(EdicionOrdenesContext);

  return (
    <Grid container>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonEdiOrdenes />
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          <BuscarOrdenReparacionPorIdForm
            label="Seleccionar orden de reparacion"
            obtener={ObtenerOrdenReparacionPorIdParaCompletar}
            cerrar={cerrarFormsPiezasMO}
          />
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          { state.formPiezas ? <p>cargar piezas</p> : null }
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          { state.formManoDeObra ? <p>cargar mano de obra</p> : null }
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          { state.formCierreOrden ? <p>cerrar orden de reparacion</p> : null }
        </Box>
      </Grid>
      <Grid container>
        { state.informacionOrdenReparacion ? <InformacionOrdenReparacion /> : null }
      </Grid>
    </Grid>
  );
}

export default EdicionOrdenes;
