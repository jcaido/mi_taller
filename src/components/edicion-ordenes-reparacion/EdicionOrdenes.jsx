import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonEdiOrdenes from './NavigationButtonEdiOrdenes';
import BuscarOrdenReparacionPorIdForm from '../autorizacion-ordenes-reparacion/forms/BuscarOrdenReparacionPorIdForm';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';
import InformacionOrdenReparacion from './InformacionOrdenReparacion';
import ImputarPiezasForm from './forms/ImputarPiezasForm';
import AbrirOrdenForm from './forms/AbrirOrdenForm';
import ImputarManoDeObraForm from './forms/ImputarManoDeObraForm';
import CerrarOrdenForm from './forms/CerrarOrdenForm';

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
          { state.formPiezas ? <ImputarPiezasForm /> : null }
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          { state.formManoDeObra ? <ImputarManoDeObraForm /> : null }
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          { state.formCierreOrden ? <CerrarOrdenForm /> : null }
        </Box>
      </Grid>
      <Grid container>
        { state.informacionOrdenReparacion ? <InformacionOrdenReparacion /> : null }
        { state.formAbrirOrdenReparacion ? <AbrirOrdenForm /> : null }
      </Grid>
    </Grid>
  );
}

export default EdicionOrdenes;
