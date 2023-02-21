import React, { createContext, useMemo, useReducer } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import useModal from '../hooks/useModal';
import ModalErrores from '../utils/ModalErrores';
import Piezas from '../components/piezas/Piezas';
import { obtenerPiezas } from '../services/axiosService';

export const AlmacenPiezassContext = createContext();

export default function AlmacenPiezas() {
  const modal = useModal();

  const piezasInicial = {
    formCrearPiezas: false,
    formBuscarPiezas: false,
    formEditarPiezas: false,
    formEliminarPiezas: false,
    editarPieza: false,
    eliminarPieza: false,
    listaPiezas: [],
  };

  const piezasReducer = (state, action) => {
    switch (action.type) {
      case 'piezas':
        return {
          ...state,
          formCrearPiezas: action.payload.formCrearPiezas,
          formBuscarPiezas: action.payload.formBuscarPiezas,
          formEditarPiezas: action.payload.formEditarPiezas,
          formEliminarPiezas: action.payload.formEliminarPiezas,
          editarPieza: action.payload.editarPieza,
          eliminarPieza: action.payload.eliminarPieza,
        };
      case 'actualizar_lista_piezas':
        return {
          ...state,
          listaPiezas: action.payload,
        };
      case 'cerrar_formulario_editar_pieza':
        return {
          ...state,
          editarPieza: action.payload,
        };
      case 'cerrar_formulario_eliminar_pieza':
        return {
          ...state,
          eliminarPieza: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(piezasReducer, piezasInicial);

  function crearPiezaFormDispatch() {
    dispatch({
      type: 'piezas',
      payload: {
        formCrearPiezas: true,
        formBuscarPiezas: false,
        formEditarPiezas: false,
        formEliminarPiezas: false,
        editarPieza: false,
        eliminarPieza: false,
      },
    });
  }

  function buscarPiezaFormDispatch() {
    dispatch({
      type: 'piezas',
      payload: {
        formCrearPiezas: false,
        formBuscarPiezas: true,
        formEditarPiezas: false,
        formEliminarPiezas: false,
        editarPieza: false,
        eliminarPieza: false,
      },
    });
  }

  function buscarPiezaParaEditarDispatch() {
    dispatch({
      type: 'piezas',
      payload: {
        formCrearPiezas: false,
        formBuscarPiezas: false,
        formEditarPiezas: true,
        formEliminarPiezas: false,
        editarPieza: false,
        eliminarPieza: false,
      },
    });
  }

  function buscarPiezaParaEliminarDispatch() {
    dispatch({
      type: 'piezas',
      payload: {
        formCrearPiezas: false,
        formBuscarPiezas: false,
        formEditarPiezas: false,
        formEliminarPiezas: true,
        editarPieza: false,
        eliminarPieza: false,
      },
    });
  }

  function editarPiezaFormDispatch() {
    dispatch({
      type: 'piezas',
      payload: {
        formCrearPiezas: false,
        formBuscarPiezas: false,
        formEditarPiezas: true,
        formEliminarPiezas: false,
        editarPieza: true,
        eliminarPieza: false,
      },
    });
  }

  function eliminarProveedorFormDispatch() {
    dispatch({
      type: 'piezas',
      payload: {
        formCrearPiezas: false,
        formBuscarPiezas: false,
        formEditarPiezas: false,
        formEliminarPiezas: true,
        editarPieza: false,
        eliminarPieza: true,
      },
    });
  }

  const ListarPiezas = () => {
    obtenerPiezas()
      .then((response) => {
        dispatch({ type: 'actualizar_lista_piezas', payload: response.data });
      })
      .catch(() => {
        modal.handleOpenError('Something went wrong');
      });
  };

  const piezasProviderValue = useMemo(
    () => ({
      state,
      crearPiezaFormDispatch,
      buscarPiezaFormDispatch,
      buscarPiezaParaEditarDispatch,
      buscarPiezaParaEliminarDispatch,
      editarPiezaFormDispatch,
      eliminarProveedorFormDispatch,
      ListarPiezas,
    }
    ),
    [
      state,
      crearPiezaFormDispatch,
      buscarPiezaFormDispatch,
      buscarPiezaParaEditarDispatch,
      buscarPiezaParaEliminarDispatch,
      editarPiezaFormDispatch,
      eliminarProveedorFormDispatch,
      ListarPiezas,
    ],
  );

  return (
    <AlmacenPiezassContext.Provider value={piezasProviderValue}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="h7" gutterBottom>PIEZAS</Typography>
          </Box>
          <Box>
            <Piezas />
          </Box>
        </Grid>
        <ModalErrores
          openError={modal.openError}
          message={modal.message}
          handleCloseError={modal.handleCloseError}
        />
      </Grid>
    </AlmacenPiezassContext.Provider>
  );
}
