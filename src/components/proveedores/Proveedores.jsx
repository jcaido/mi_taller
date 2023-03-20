import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonProveedores from './NavigationButtonProveedores';
import { AlmacenProveedoresContext } from '../../pages/AlmacenProveedores';
import NuevoProveedorForm from './forms/NuevoProveedorForm';
import TablaProveedores from './TablaProveedores';
import BuscarProveedorForm from './forms/BuscarProveedorForm';
import Proveedor from './Proveedor';
import TablaProveedoresBusquedas from './TablaProveedoresBusquedas';
import EditarProveedorForm from './forms/EditarProveedorForm';
import EliminarProveedorForm from './forms/EliminarProveedorForm';
import BuscarPorUnInput from '../BuscarPorUnInput';

export default function Proveedores() {
  const {
    state,
    crearProveedorFormDispatch,
    buscarProveedorFormDispatch,
    buscarProveedorParaEditarDispatch,
    buscarProveedorParaEliminarDispatch,
    ObtenerProveedorPorDniCifParaEditar,
    ObtenerProveedorPorDniCifParaEliminar,
    CerrarFormEditarProveedor,
    CerrarFormEliminarProveedor,
  } = useContext(AlmacenProveedoresContext);

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonProveedores
            crearProveedor={crearProveedorFormDispatch}
            buscarProveedor={buscarProveedorFormDispatch}
            editarProveedor={buscarProveedorParaEditarDispatch}
            eliminarProveedor={buscarProveedorParaEliminarDispatch}
          />
        </Box>
      </Grid>
      <Grid item md={4}>
        <Box>
          {state.formCrearProveedor ? <NuevoProveedorForm /> : null}
          {state.formBuscarProveedor ? <BuscarProveedorForm /> : null}
          {state.formEditarProveedor
            ? (
              <BuscarPorUnInput
                label="Editar Proveedor"
                textInput="dni_ci"
                inputLabel="dni / cif"
                obtener={ObtenerProveedorPorDniCifParaEditar}
                cerrar={CerrarFormEditarProveedor}
              />
            ) : null }
          {state.formEliminarProveedor
            ? (
              <BuscarPorUnInput
                label="Eliminar Proveedor"
                textInput="dni_ci"
                inputLabel="dni / cif"
                obtener={ObtenerProveedorPorDniCifParaEliminar}
                cerrar={CerrarFormEliminarProveedor}
              />
            ) : null}
        </Box>
      </Grid>
      <Grid item md={8}>
        {state.formCrearProveedor ? <TablaProveedores /> : null}
        {state.proveedorPorDniCif ? <Proveedor context={AlmacenProveedoresContext} /> : null}
        {state.proveedoresPorNombre
          ? <TablaProveedoresBusquedas lista={state.listaProveedores} /> : null}
        {state.editarProveedor ? <EditarProveedorForm /> : null}
        {state.eliminarProveedor ? <EliminarProveedorForm /> : null}
      </Grid>
    </Grid>
  );
}
