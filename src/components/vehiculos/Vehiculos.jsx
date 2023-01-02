import React, { useContext } from 'react';
import { Box  } from '@mui/material';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';
import NavigationButton from '../NavigationButton';
import NuevoVehiculoForm from './forms/NuevoVehiculoForm';
import BuscarVehiculoForm from './forms/BuscarVehiculoForm';
import Vehiculo from './Vehiculo';
import TablaVehiculos from './TablaVehiculos';
import TablaVehiculosPorMarcaModelo from './TablaVehiculosPorMarcaModelo';
import TablaVehiculosPorPropietario from './TablaVehiculosPorPropietario';
import EditarVehiculoForm from './forms/EditarVehiculoForm';
import BuscarVehiculoParaEditarForm from './forms/BuscarVehiculoParaEditarForm';
import BuscarVehiculoParaEliminar from './forms/BuscarVehiculoParaEliminar';
import EliminarVehiculoForm from './forms/EliminarVehiculoForm';

const Vehiculos = () => {

  const {
    state,
    nuevoVehiculoFormDispatch,
    buscarVehiculoFormDispatch,
    buscarVehiculoParaEditarDispatch,
    buscarVehiculoParaEliminarDispatch
  } = useContext(DatosGeneralesFormContext);

  return (
    <Box>
      <Box mt = {1}>
        <NavigationButton
          nuevo = { nuevoVehiculoFormDispatch }
          buscar = { buscarVehiculoFormDispatch }
          buscarParaEditar = { buscarVehiculoParaEditarDispatch }
          buscarParaEliminar = { buscarVehiculoParaEliminarDispatch }
          nuevoTitle = 'crear vehiculo'
          buscarTitle = 'buscar vehiculo'
          editarTitle = 'editar vehiculo'
          eliminarTitle = 'eliminar vehiculo'  
        /> 
      </Box>
      <Box>
        { state.formNuevoVehiculo && <NuevoVehiculoForm></NuevoVehiculoForm>}
        { state.formBuscarVehiculo && <BuscarVehiculoForm></BuscarVehiculoForm>}
        { state.formEditarVehiculo && <BuscarVehiculoParaEditarForm></BuscarVehiculoParaEditarForm>}
        { state.formEliminarVehiculo && <BuscarVehiculoParaEliminar></BuscarVehiculoParaEliminar>}
      </Box>
      <Box p = {2}>
        { state.tablaVehiculos && <TablaVehiculos></TablaVehiculos> }
        { state.vehiculoPorMatricula && state.listaVehiculosPorMatricula !== null && <Vehiculo></Vehiculo>}
        { state.vehiculosPorMarcaModelo && <TablaVehiculosPorMarcaModelo></TablaVehiculosPorMarcaModelo>  }
        { state.vehiculosPorPropietario && <TablaVehiculosPorPropietario></TablaVehiculosPorPropietario>  }
      </Box>
      <Box>
        { state.editarVehiculo && <EditarVehiculoForm></EditarVehiculoForm> }
        { state.eliminarVehiculo && <EliminarVehiculoForm></EliminarVehiculoForm> }
      </Box>
    </Box>
  )
}

export default Vehiculos
