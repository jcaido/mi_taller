import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { AlmacenEntradasContext } from '../../pages/AlmacenEntradas';
import NavigationButtonEntradas from './NavigationButtonEntradas';

export default function Entradas() {
  const {
    state,
    crearAlbaranEntradasFormDispatch,
    buscarProveedorFormDispatch,
    buscarPiezaFormDispatch,
  } = useContext(AlmacenEntradasContext);

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonEntradas
            crearAlbaran={crearAlbaranEntradasFormDispatch}
            buscarProveedor={buscarProveedorFormDispatch}
            buscarPieza={buscarPiezaFormDispatch}
          />
        </Box>
      </Grid>
      <Grid item md={4}>
        <Box>
          {state.formCrearAlbaranEntradas ? <p>formulario crear albaran</p> : null}
        </Box>
      </Grid>
      <Grid item md={4}>
        <Box>
          {state.formBuscarProveedor ? <p>formulario buscar proveedor</p> : null}
          {state.formBuscarPieza ? <p>formulario buscar pieza</p> : null}
        </Box>
      </Grid>
    </Grid>
  );
}
