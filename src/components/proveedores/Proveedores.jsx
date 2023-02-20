import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonProveedores from './NavigationButtonProveedores';
import { AlmacenProveedoresContext } from '../../pages/AlmacenProveedores';
import NuevoProveedorForm from './forms/NuevoProveedorForm';
import TablaProveedores from './TablaProveedores';
import BuscarProveedorForm from './forms/BuscarProveedorForm';
import Proveedor from './Proveedor';

export default function Proveedores() {
  const {
    state,
    crearProveedorFormDispatch,
    buscarProveedorFormDispatch,
    editarProveedorFormDispatch,
    eliminarProveedorFormDispatch,
  } = useContext(AlmacenProveedoresContext);

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonProveedores
            crearProveedor={crearProveedorFormDispatch}
            buscarProveedor={buscarProveedorFormDispatch}
            editarProveedor={editarProveedorFormDispatch}
            eliminarProveedor={eliminarProveedorFormDispatch}
          />
        </Box>
      </Grid>
      <Grid item md={4}>
        <Box>
          {state.formCrearProveedor ? <NuevoProveedorForm /> : null}
          {state.formBuscarProveedor ? <BuscarProveedorForm /> : null}
          {state.formEditarProveedor ? <p>formulario editar proveedor</p> : null}
          {state.formEliminarProveedor ? <p>forumulario eliminar proveedor</p> : null}
        </Box>
      </Grid>
      <Grid item md={8}>
        {state.formCrearProveedor ? <TablaProveedores /> : null}
        {state.proveedorPorDniCif ? <Proveedor /> : null}
      </Grid>
    </Grid>
  );
}
