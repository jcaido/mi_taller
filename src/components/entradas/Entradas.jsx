import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { AlmacenEntradasContext } from '../../pages/AlmacenEntradas';
import NavigationButtonEntradas from './NavigationButtonEntradas';
import NuevoAlbaranEntradasForm from './forms/NuevoAlbaranEntradasForm';
import TablaAlbaranesEntrada from './TablaAlbaranesEntrada';
import Proveedor from '../proveedores/Proveedor';
import NuevaEntradaPiezaForm from './forms/NuevaEntradaPiezaForm';
import DetalleAlbaran from './DetalleAlbaran';
import EditarAlbaranForm from './forms/EditarAlbaranForm';
import EliminarAlbaranForm from './forms/EliminarAlbaranForm';
import BuscarPorUnInput from '../BuscarPorUnInput';

export default function Entradas() {
  const {
    state,
    crearAlbaranEntradasFormDispatch,
    seleccionarParaEditarAlbaranFormDispatch,
    seleccionarParaEliminrAlbaranFormDispatch,
    ObtenerProveedorPorDniCif,
    CerrarFormBuscarProveedor,
    addEntradasFormDispatch,
    ObtenerAlbaranPorId,
    ObtenerAlbaranPorIdParaModificar,
    ObtenerAlbaranPorIdParaEliminar,
    CerrarFormNuevaEntradaYDetalleAlbaran,
    CerrarFormEditarAlbaran,
    CerrarFormEliminarAlbaran,
  } = useContext(AlmacenEntradasContext);

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonEntradas
            crearAlbaran={crearAlbaranEntradasFormDispatch}
            editarAlbaran={seleccionarParaEditarAlbaranFormDispatch}
            eliminarAlbaran={seleccionarParaEliminrAlbaranFormDispatch}
            addEntradas={addEntradasFormDispatch}
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
                <BuscarPorUnInput
                  label="Buscar proveedor"
                  textInput="dni_ci"
                  inputLabel="dni / cif"
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
      {state.formSeleccionarAlbaran
        ? (
          <>
            <Grid item md={4}>
              <Box>
                <BuscarPorUnInput
                  label="Seleccionar albaran para añadir entradas"
                  textInput="id"
                  inputLabel="referencia(id)"
                  obtener={ObtenerAlbaranPorId}
                  cerrar={CerrarFormNuevaEntradaYDetalleAlbaran}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Box>
                {state.formNuevaEntrada
                  ? <NuevaEntradaPiezaForm albaran={state.listaAlbaranesEntrada} /> : null}
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box>
                {state.viewDetalleAlbaran
                  ? <DetalleAlbaran albaran={state.listaAlbaranesEntrada} /> : null}
              </Box>
            </Grid>
          </>
        ) : null}
      {state.formSeleccionarParaEditar
        ? (
          <>
            <Grid item md={4}>
              <Box>
                <BuscarPorUnInput
                  label="Seleccionar albaran para editarlo"
                  textInput="id"
                  inputLabel="referencia(id)"
                  obtener={ObtenerAlbaranPorIdParaModificar}
                  cerrar={CerrarFormEditarAlbaran}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              {state.formEditarAlbaran ? <EditarAlbaranForm /> : null}
            </Grid>
          </>
        ) : null}
      {state.formSeleccionarParaEliminar
        ? (
          <>
            <Grid item md={4}>
              <Box>
                <BuscarPorUnInput
                  label="Seleccionar albaran para eliminarlo"
                  textInput="id"
                  inputLabel="referencia(id)"
                  obtener={ObtenerAlbaranPorIdParaEliminar}
                  cerrar={CerrarFormEliminarAlbaran}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              {state.formEliminarAlbaran ? <EliminarAlbaranForm /> : null}
            </Grid>
          </>
        ) : null}
    </Grid>
  );
}
