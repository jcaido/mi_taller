import React, { useContext } from 'react';
import { Box  } from '@mui/material';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';
import NuevoPropietarioForm from './forms/NuevoPropietarioForm';
import TablaPropietarios from './TablaPropietarios';
import BuscarPropietarioForm from './forms/BuscarPropietarioForm';
import Propietario from './Propietario';
import TablaPropietariosBusquedas from './TablaPropietariosBusquedas';
import BuscarPropietarioPorDniForm from './forms/BuscarPropietarioPorDniForm';
import EditarPropietarioForm from './forms/EditarPropietarioForm';
import EliminarPropietarioForm from './forms/EliminarPropietarioForm';
import NavigationButton from '../NavigationButton';

const Propietarios = () => {

  const {
    state,
    nuevoPropietarioFormDispatch,
    buscarPropietarioFormDispatch,
    buscarPropietarioParaEditarDispatch,
    buscarPropietarioParaEliminarDispatch,
    ObtenerPropietarioPorDniParaEditar,
    CerrarFormEditarPropietario,
    obtenerPropietarioPorDniParaEliminar,
    CerrarFormEliminarPropietario
  } = useContext(DatosGeneralesFormContext);


  return (
    <Box>
      <Box mt = {1}>
        <NavigationButton
          nuevo = { nuevoPropietarioFormDispatch }
          buscar = { buscarPropietarioFormDispatch }
          buscarParaEditar = { buscarPropietarioParaEditarDispatch }
          buscarParaEliminar = { buscarPropietarioParaEliminarDispatch }
          nuevoTitle = 'crear propietario'
          buscarTitle = 'buscar propietarios'
          editarTitle = 'editar propietario'
          eliminarTitle = 'eliminar propietario'          
        />   
      </Box> 
      <Box>
        { state.formNuevoPropietario && <NuevoPropietarioForm></NuevoPropietarioForm>}
        { state.formBuscarPropietario && <BuscarPropietarioForm></BuscarPropietarioForm>}
        { state.formEditarPropietario && 
          <BuscarPropietarioPorDniForm
            label = 'Editar propietario' 
            obtener = { ObtenerPropietarioPorDniParaEditar } 
            cerrar = { CerrarFormEditarPropietario }>
          </BuscarPropietarioPorDniForm> }
        { state.formEliminarPropietario && 
          <BuscarPropietarioPorDniForm
            label = 'Eliminar propietario'
            obtener = { obtenerPropietarioPorDniParaEliminar } 
            cerrar = { CerrarFormEliminarPropietario }>
          </BuscarPropietarioPorDniForm> }
      </Box>
      <Box p = {2}>
        { state.tablaPropietarios && <TablaPropietarios></TablaPropietarios> }
        { state.propietarioPorDni && state.listaPropietariosPorDni !== null && <Propietario></Propietario>}
        { state.propietariosPorPrimerApellido && <TablaPropietariosBusquedas lista = { state.listaPropietariosPorPrimerApellido }></TablaPropietariosBusquedas> }
        { state.propietariosPorCodigoPostal && <TablaPropietariosBusquedas lista = { state.listaPropietariosPorCodigoPostal }></TablaPropietariosBusquedas> }
      </Box>
      <Box>
        { state.editarPropietario && <EditarPropietarioForm></EditarPropietarioForm> }
        { state.eliminarPropietario && <EliminarPropietarioForm></EliminarPropietarioForm> }
      </Box>
    </Box>  
  )
}

export default Propietarios