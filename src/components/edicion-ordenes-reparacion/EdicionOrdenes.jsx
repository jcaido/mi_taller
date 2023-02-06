import React, { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import NavigationButtonEdiOrdenes from './NavigationButtonEdiOrdenes';
import BuscarOrdenReparacionPorIdForm from '../autorizacion-ordenes-reparacion/forms/BuscarOrdenReparacionPorIdForm';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';
import InformacionOrdenReparacion from './InformacionOrdenReparacion';
import ImputarPiezasForm from './forms/ImputarPiezasForm';
import ImputarManoDeObraForm from './forms/ImputarManoDeObraForm';
import CerrarOrdenForm from './forms/CerrarOrdenForm';
import EstablecerPrecioManoDeObraForm from './forms/EstablecerPrecioManoDeObraForm';
import InformacionPrecioManoDeObraActual from './InformacionPrecioManoDeObraActual';
import { establecerPrecioManoDeObra, obtenerPrecioManDeObraActual } from '../../services/axiosService';

function EdicionOrdenes() {
  const {
    state,
    ObtenerOrdenReparacionPorIdParaCompletar,
    cerrarFormsPiezasMO,
    establecerPrecioManoDeObraFormDispatch,
    buscarOrdenReparacionFormDispatch,
  } = useContext(EdicionOrdenesContext);

  const [manodeObraActual, setManodeObraActual] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const establecerManoDeObraActual = (precioManoDeObra) => {
    establecerPrecioManoDeObra(precioManoDeObra)
      .then(() => {
        handleOpen();
        obtenerPrecioManDeObraActual()
          .then((response) => {
            setManodeObraActual(response.data);
          });
      });
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonEdiOrdenes
            establecerPrecioManoDeObra={establecerPrecioManoDeObraFormDispatch}
            buscarOrdenReparacion={buscarOrdenReparacionFormDispatch}
          />
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          {state.formSeleccionarOrdenReparacion
            ? (
              <BuscarOrdenReparacionPorIdForm
                label="Seleccionar orden de reparacion"
                obtener={ObtenerOrdenReparacionPorIdParaCompletar}
                cerrar={cerrarFormsPiezasMO}
              />
            ) : null}
          {state.formPrecioManoDeObra ? (
            <EstablecerPrecioManoDeObraForm
              establecerManoDeObraActual={establecerManoDeObraActual}
              open={open}
              handleClose={handleClose}
            />
          ) : null}
        </Box>
        <Box>
          {state.formPrecioManoDeObra ? (
            <InformacionPrecioManoDeObraActual
              manodeObraActual={manodeObraActual}
              setManodeObraActual={setManodeObraActual}
            />
          ) : null}
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
