import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonPiezas from './NavigationButtonPiezas';
import { AlmacenPiezassContext } from '../../pages/AlmacenPiezas';
import NuevaPiezaForm from './forms/NuevaPiezaForm';
import TablaPiezas from './TablaPiezas';
import BuscarPiezaForm from './forms/BuscarPiezaForm';
import Pieza from './Pieza';
import TablaPiezasBusquedas from './TablaPiezasBusquedas';
import BuscarPiezaPorReferenciaForm from './forms/BuscarPiezaPorReferenciaForm';
import EditarPiezaForm from './forms/EditarPiezaForm';

export default function Piezas() {
  const {
    state,
    crearPiezaFormDispatch,
    buscarPiezaFormDispatch,
    buscarPiezaParaEditarDispatch,
    buscarPiezaParaEliminarDispatch,
    ObtenerPiezaPorReferenciaParaEditar,
    CerrarFormEditarPieza,
  } = useContext(AlmacenPiezassContext);

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonPiezas
            crearPieza={crearPiezaFormDispatch}
            buscarPieza={buscarPiezaFormDispatch}
            editarPieza={buscarPiezaParaEditarDispatch}
            eliminarPieza={buscarPiezaParaEliminarDispatch}
          />
        </Box>
      </Grid>
      <Grid item md={4}>
        <Box>
          {state.formCrearPiezas ? <NuevaPiezaForm /> : null}
          {state.formBuscarPiezas ? <BuscarPiezaForm /> : null}
          {state.formEditarPiezas
            ? (
              <BuscarPiezaPorReferenciaForm
                label="Editar Pieza"
                obtener={ObtenerPiezaPorReferenciaParaEditar}
                cerrar={CerrarFormEditarPieza}
              />
            ) : null}
        </Box>
      </Grid>
      <Grid item md={8}>
        {state.formCrearPiezas ? <TablaPiezas /> : null}
        {state.piezaPorReferencia ? <Pieza /> : null}
        {state.piezasPorNombre ? <TablaPiezasBusquedas lista={state.listaPiezas} /> : null}
        {state.editarPieza ? <EditarPiezaForm /> : null}
      </Grid>
    </Grid>
  );
}
