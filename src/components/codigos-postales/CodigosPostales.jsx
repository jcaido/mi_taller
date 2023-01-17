import React, { useContext } from 'react';
import { Box } from '@mui/material';
import NuevoCodigoPostalForm from './forms/NuevoCodigoPostalForm';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';
import TablaCodigosPostales from './TablaCodigosPostales';
import BuscarCodigoPostalForm from './forms/BuscarCodigoPostalForm';
import EditarCodigoPostalForm from './forms/EditarCodigoPostalForm';
import CodigoPostal from './CodigoPostal';
import TablaCodigosPostalesPorProvincia from './TablaCodigosPostalesPorProvincia';
import BuscarCodigoPostalPorCodigoForm from './forms/BuscarCodigoPostalPorCodigoForm';
import EliminarCodigoPostalForm from './forms/EliminarCodigoPostalForm';
import NavigationButton from '../NavigationButton';

function CodigosPostales() {
  const {
    state,
    nuevoCodigoPostalFormDispatch,
    buscarCodigoPostalFormDispatch,
    buscarCodigoPostalParaEditarDispatch,
    buscarCodigoPostalParaEliminarDispatch,
    ObtenerCodigoPostalPorCodigoParaEditar,
    CerrarFormEditarCodigoPostal,
    ObtenerCodigoPostalPorCodigoParaEliminar,
    CerrarFormEliminarCodigoPostal,
  } = useContext(DatosGeneralesFormContext);

  return (
    <Box>
      <Box mt={1}>
        <NavigationButton
          nuevo={nuevoCodigoPostalFormDispatch}
          buscar={buscarCodigoPostalFormDispatch}
          buscarParaEditar={buscarCodigoPostalParaEditarDispatch}
          buscarParaEliminar={buscarCodigoPostalParaEliminarDispatch}
          nuevoTitle="Crear codigo postal"
          buscarTitle="buscar codigos postales"
          editarTitle="editar codigo postal"
          eliminarTitle="eliminar codigo postal"
        />
      </Box>
      <Box>
        { state.formNuevoCodigoPostal && <NuevoCodigoPostalForm /> }
        { state.formBuscarCodigoPostal && <BuscarCodigoPostalForm />}
        { state.formEditarCodigoPostal
          && (
          <BuscarCodigoPostalPorCodigoForm
            label="Editar codigo postal"
            obtener={ObtenerCodigoPostalPorCodigoParaEditar}
            cerrar={CerrarFormEditarCodigoPostal}
          />
          )}
        { state.formEliminarCodigoPostal
          && (
          <BuscarCodigoPostalPorCodigoForm
            label="Eliminar codigo postal"
            obtener={ObtenerCodigoPostalPorCodigoParaEliminar}
            cerrar={CerrarFormEliminarCodigoPostal}
          />
          )}
      </Box>
      <Box p={2}>
        { state.tablaCodigosPostales && <TablaCodigosPostales /> }
        { (state.codigoPostalPorCodigo && state.listaCodigosPostalesPorCodigo !== null)
        && <CodigoPostal /> }
        { (state.codigoPostalPorLocalidad && state.listaCodigosPostalesPorLocalidad !== null)
        && <CodigoPostal /> }
        { state.codigoPostalPorProvincia && <TablaCodigosPostalesPorProvincia />}
      </Box>
      <Box>
        {state.editarCodigoPostal && <EditarCodigoPostalForm />}
        {state.eliminarCodigoPostal && <EliminarCodigoPostalForm />}
      </Box>
    </Box>

  );
}

export default CodigosPostales;
