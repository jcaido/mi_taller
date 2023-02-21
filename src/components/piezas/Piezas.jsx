import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonPiezas from './NavigationButtonPiezas';
import { AlmacenPiezassContext } from '../../pages/AlmacenPiezas';
import NuevaPiezaForm from './forms/NuevaPiezaForm';
import TablaPiezas from './TablaPiezas';

export default function Piezas() {
  const {
    state,
    crearPiezaFormDispatch,
    buscarPiezaFormDispatch,
    buscarPiezaParaEditarDispatch,
    buscarPiezaParaEliminarDispatch,
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
        </Box>
      </Grid>
      <Grid item md={8}>
        {state.formCrearPiezas ? <TablaPiezas /> : null}
      </Grid>
    </Grid>
  );
}
