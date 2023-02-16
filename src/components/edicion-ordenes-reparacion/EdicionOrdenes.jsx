import React, { useContext, useState, useEffect } from 'react';
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
import ModalErrores from '../../utils/ModalErrores';
import useModal from '../../hooks/useModal';

function EdicionOrdenes() {
  const {
    state,
    ObtenerOrdenReparacionPorIdParaCompletar,
    cerrarFormsPiezasMO,
    establecerPrecioManoDeObraFormDispatch,
    buscarOrdenReparacionFormDispatch,
  } = useContext(EdicionOrdenesContext);

  const modal = useModal();

  const [manodeObraActual, setManodeObraActual] = useState();

  useEffect(() => {
    obtenerPrecioManDeObraActual()
      .then((response) => setManodeObraActual(response.data.precioHoraClienteTaller));
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const establecerManoDeObraActual = (precioManoDeObra) => {
    establecerPrecioManoDeObra(precioManoDeObra)
      .then(() => {
        handleOpen();
        obtenerPrecioManDeObraActual()
          .then((response) => {
            setManodeObraActual(response.data.precioHoraClienteTaller);
          });
      })
      .catch((error) => {
        if (error.response.status === 409) { modal.handleOpenError(error.response.data.mensaje); }
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
            <>
              <EstablecerPrecioManoDeObraForm
                establecerManoDeObraActual={establecerManoDeObraActual}
                open={open}
                handleClose={handleClose}
              />
              <InformacionPrecioManoDeObraActual
                precioManodeObraActual={manodeObraActual}
              />
            </>
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
      <ModalErrores
        openError={modal.openError}
        message={modal.message}
        handleCloseError={modal.handleCloseError}
      />
    </Grid>
  );
}

export default EdicionOrdenes;
