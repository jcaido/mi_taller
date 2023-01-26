import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import NavigationButtonEdiOrdenes from './NavigationButtonEdiOrdenes';
import BuscarOrdenReparacionPorIdForm from '../autorizacion-ordenes-reparacion/forms/BuscarOrdenReparacionPorIdForm';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';
import InformacionOrdenReparacion from './InformacionOrdenReparacion';
import ImputarPiezasForm from './forms/ImputarPiezasForm';
import ImputarManoDeObraForm from './forms/ImputarManoDeObraForm';
import CerrarOrdenForm from './forms/CerrarOrdenForm';

function EdicionOrdenes() {
  const {
    state,
    ObtenerOrdenReparacionPorIdParaCompletar,
    cerrarFormsPiezasMO,
  } = useContext(EdicionOrdenesContext);

  return (
    <Grid container rowSpacing={1}>
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
      <Grid item md={12} mb={2}>
        <Divider />
      </Grid>
      <Grid container>
        { state.informacionOrdenReparacion ? <InformacionOrdenReparacion /> : null }
      </Grid>
    </Grid>
  );
}

export default EdicionOrdenes;
