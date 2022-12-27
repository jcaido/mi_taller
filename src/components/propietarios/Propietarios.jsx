import React, { useContext } from 'react';
import { Box  } from '@mui/material';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';
import NuevoPropietarioForm from './forms/NuevoPropietarioForm';
import TablaPropietarios from './TablaPropietarios';
import BuscarPropietarioForm from './forms/BuscarPropietarioForm';
import Propietario from './Propietario';
import TablaPropietariosPorPrimerApellido from './TablaPropietariosPorPrimerApellido';
import TablaPropietariosPorCodigoPostal from './TablaPropietariosPorCodigoPostal';
import BuscarPropietarioParaEditarForm from './forms/BuscarPropietarioParaEditarForm';
import EditarPropietarioForm from './forms/EditarPropietarioForm';
import BuscarPropietarioParaEliminarForm from './forms/BuscarPropietarioParaEliminarForm';
import EliminarPropietarioForm from './forms/EliminarPropietarioForm';
import NavigationButton from '../NavigationButton';

const Propietarios = () => {

  const {
    state,
    nuevoPropietarioFormDispatch,
    buscarPropietarioFormDispatch,
    buscarPropietarioParaEditarDispatch,
    buscarPropietarioParaEliminarDispatch
  } = useContext(DatosGeneralesFormContext);


  return (
    <Box>
      <Box mt = {1}>
        {/*<NavigationButtonPropietarios></NavigationButtonPropietarios>*/}
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
        { state.formEditarPropietario && <BuscarPropietarioParaEditarForm></BuscarPropietarioParaEditarForm>}
        { state.formEliminarPropietario && <BuscarPropietarioParaEliminarForm></BuscarPropietarioParaEliminarForm>}
      </Box>
      <Box p = {2}>
        { state.tablaPropietarios && <TablaPropietarios></TablaPropietarios> }
        { state.propietarioPorDni && state.listaPropietariosPorDni !== null && <Propietario></Propietario>}
        { state.propietariosPorPrimerApellido && <TablaPropietariosPorPrimerApellido></TablaPropietariosPorPrimerApellido> }
        { state.propietariosPorCodigoPostal && <TablaPropietariosPorCodigoPostal></TablaPropietariosPorCodigoPostal> }
      </Box>
      <Box>
        { state.editarPropietario && <EditarPropietarioForm></EditarPropietarioForm> }
        { state.eliminarPropietario && <EliminarPropietarioForm></EliminarPropietarioForm> }
      </Box>
    </Box>  
  )
}

export default Propietarios