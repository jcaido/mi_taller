import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';
import NavigationButton from '../NavigationButton';
import NuevoVehiculoForm from './forms/NuevoVehiculoForm';
import BuscarVehiculoForm from './forms/BuscarVehiculoForm';
import Vehiculo from './Vehiculo';
import TablaVehiculos from './TablaVehiculos';
import TablaVehiculosBusquedas from './TablaVehiculosBusquedas';
import EditarVehiculoForm from './forms/EditarVehiculoForm';
import BuscarVehiculoPorMatriculaForm from './forms/BuscarVehiculoPorMatriculaForm';
import EliminarVehiculoForm from './forms/EliminarVehiculoForm';

function Vehiculos() {
  const {
    state,
    nuevoVehiculoFormDispatch,
    buscarVehiculoFormDispatch,
    buscarVehiculoParaEditarDispatch,
    buscarVehiculoParaEliminarDispatch,
    ObtenerVehiculoPorMatriculaParaEditar,
    CerrarFormEditarVehiculo,
    obtenerVehiculoPorMatriculaParaEliminar,
    CerrarFormEliminarVehiculo,
  } = useContext(DatosGeneralesFormContext);

  return (
    <Box>
      <Box mt={1}>
        <NavigationButton
          nuevo={nuevoVehiculoFormDispatch}
          buscar={buscarVehiculoFormDispatch}
          buscarParaEditar={buscarVehiculoParaEditarDispatch}
          buscarParaEliminar={buscarVehiculoParaEliminarDispatch}
          nuevoTitle="crear vehiculo"
          buscarTitle="buscar vehiculo"
          editarTitle="editar vehiculo"
          eliminarTitle="eliminar vehiculo"
        />
      </Box>
      <Box>
        { state.formNuevoVehiculo && <NuevoVehiculoForm />}
        { state.formBuscarVehiculo && <BuscarVehiculoForm />}
        { state.formEditarVehiculo
          && (
          <BuscarVehiculoPorMatriculaForm
            label="Editar vehiculo"
            obtener={ObtenerVehiculoPorMatriculaParaEditar}
            cerrar={CerrarFormEditarVehiculo}
          />
          )}
        { state.formEliminarVehiculo
          && (
          <BuscarVehiculoPorMatriculaForm
            label="Eliminar vehiculo"
            obtener={obtenerVehiculoPorMatriculaParaEliminar}
            cerrar={CerrarFormEliminarVehiculo}
          />
          )}
      </Box>
      <Box p={2}>
        { state.tablaVehiculos && <TablaVehiculos /> }
        { state.vehiculoPorMatricula && state.listaVehiculosPorMatricula !== null && <Vehiculo />}
        { state.vehiculosPorMarcaModelo
        && <TablaVehiculosBusquedas lista={state.listaVehiculosPorMarcaModelo} /> }
        { state.vehiculosPorPropietario
        && <TablaVehiculosBusquedas lista={state.listaVehiculosPorPropietario} /> }
      </Box>
      <Box>
        { state.editarVehiculo && <EditarVehiculoForm /> }
        { state.eliminarVehiculo && <EliminarVehiculoForm /> }
      </Box>
    </Box>
  );
}

export default Vehiculos;
