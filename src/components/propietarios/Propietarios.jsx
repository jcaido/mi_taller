import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';
import NuevoPropietarioForm from './forms/NuevoPropietarioForm';
import TablaPropietarios from './TablaPropietarios';
import BuscarPropietarioForm from './forms/BuscarPropietarioForm';
import Propietario from './Propietario';
import TablaPropietariosBusquedas from './TablaPropietariosBusquedas';
import EditarPropietarioForm from './forms/EditarPropietarioForm';
import EliminarPropietarioForm from './forms/EliminarPropietarioForm';
import NavigationButton from '../NavigationButton';
import BuscarPorUnInput from '../BuscarPorUnInput';

function Propietarios() {
  const {
    state,
    nuevoPropietarioFormDispatch,
    buscarPropietarioFormDispatch,
    buscarPropietarioParaEditarDispatch,
    buscarPropietarioParaEliminarDispatch,
    ObtenerPropietarioPorDniParaEditar,
    CerrarFormEditarPropietario,
    obtenerPropietarioPorDniParaEliminar,
    CerrarFormEliminarPropietario,
  } = useContext(DatosGeneralesFormContext);

  return (
    <Box>
      <Box mt={1}>
        <NavigationButton
          nuevo={nuevoPropietarioFormDispatch}
          buscar={buscarPropietarioFormDispatch}
          buscarParaEditar={buscarPropietarioParaEditarDispatch}
          buscarParaEliminar={buscarPropietarioParaEliminarDispatch}
          nuevoTitle="crear propietario"
          buscarTitle="buscar propietarios"
          editarTitle="editar propietario"
          eliminarTitle="eliminar propietario"
        />
      </Box>
      <Box>
        { state.formNuevoPropietario && <NuevoPropietarioForm />}
        { state.formBuscarPropietario && <BuscarPropietarioForm />}
        { state.formEditarPropietario
          && (
          <BuscarPorUnInput
            label="Editar propietario"
            textInput="dni"
            inputLabel="dni"
            obtener={ObtenerPropietarioPorDniParaEditar}
            cerrar={CerrarFormEditarPropietario}
          />
          )}
        { state.formEliminarPropietario
          && (
          <BuscarPorUnInput
            label="Eliminar propietario"
            textInput="dni"
            inputLabel="dni"
            obtener={obtenerPropietarioPorDniParaEliminar}
            cerrar={CerrarFormEliminarPropietario}
          />
          )}
      </Box>
      <Box p={2}>
        { state.tablaPropietarios && <TablaPropietarios /> }
        { state.propietarioPorDni && state.listaPropietariosPorDni !== null && <Propietario />}
        { state.propietariosPorPrimerApellido
        && <TablaPropietariosBusquedas lista={state.listaPropietariosPorPrimerApellido} /> }
        { state.propietariosPorCodigoPostal
        && <TablaPropietariosBusquedas lista={state.listaPropietariosPorCodigoPostal} /> }
      </Box>
      <Box>
        { state.editarPropietario && <EditarPropietarioForm /> }
        { state.eliminarPropietario && <EliminarPropietarioForm /> }
      </Box>
    </Box>
  );
}

export default Propietarios;
