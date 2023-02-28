import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { AlmacenEntradasContext } from '../../pages/AlmacenEntradas';
import NavigationButtonEntradas from './NavigationButtonEntradas';
import NuevoAlbaranEntradasForm from './forms/NuevoAlbaranEntradasForm';
import TablaAlbaranesEntrada from './TablaAlbaranesEntrada';
import BuscarProveedorPorDniCifForm from '../proveedores/forms/BuscarProveedorPorDniCifForm';
import Proveedor from '../proveedores/Proveedor';

export default function Entradas() {
  const {
    state,
    crearAlbaranEntradasFormDispatch,
    ObtenerProveedorPorDniCif,
    CerrarFormBuscarProveedor,
  } = useContext(AlmacenEntradasContext);

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonEntradas
            crearAlbaran={crearAlbaranEntradasFormDispatch}
          />
        </Box>
      </Grid>
      {state.formCrearAlbaranEntradas
        ? (
          <>
            <Grid item md={4}>
              <Box>
                <NuevoAlbaranEntradasForm />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box>
                <BuscarProveedorPorDniCifForm
                  label="Buscar proveedor"
                  obtener={ObtenerProveedorPorDniCif}
                  cerrar={CerrarFormBuscarProveedor}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box>
                {state.proveedor ? <Proveedor context={AlmacenEntradasContext} /> : null}
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box>
                <TablaAlbaranesEntrada />
              </Box>
            </Grid>
          </>
        ) : null}
    </Grid>
  );
}
