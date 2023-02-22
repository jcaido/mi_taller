import React, { createContext, useMemo, useReducer } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import useModal from '../hooks/useModal';
import ModalErrores from '../utils/ModalErrores';
import Piezas from '../components/piezas/Piezas';
import { obtenerPiezaPorNombre, obtenerPiezaPorReferencia, obtenerPiezas } from '../services/axiosService';

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
    piezaPorReferencia: false,
    piezasPorNombre: false,
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
          piezaPorReferencia: action.payload.piezaPorReferencia,
          piezasPorNombre: action.payload.piezasPorNombre,
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
        piezaPorReferencia: false,
        piezasPorNombre: false,
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
        piezaPorReferencia: false,
        piezasPorNombre: false,
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
        piezaPorReferencia: false,
        piezasPorNombre: false,
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
        piezaPorReferencia: false,
        piezasPorNombre: false,
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
        piezaPorReferencia: false,
        piezasPorNombre: false,
      },
    });
  }

  function buscarPiezaPorReferenciaDispatch() {
    dispatch({
      type: 'piezas',
      payload: {
        formCrearPiezas: false,
        formBuscarPiezas: true,
        formEditarPiezas: false,
        formEliminarPiezas: false,
        editarPieza: false,
        eliminarPieza: false,
        piezaPorReferencia: true,
        piezasPorNombre: false,
      },
    });
  }

  function buscarPiezaPorNombreDispatch() {
    dispatch({
      type: 'piezas',
      payload: {
        formCrearPiezas: false,
        formBuscarPiezas: true,
        formEditarPiezas: false,
        formEliminarPiezas: false,
        editarPieza: false,
        eliminarPieza: false,
        piezaPorReferencia: false,
        piezasPorNombre: true,
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
        piezaPorReferencia: false,
        piezasPorNombre: false,
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

  const ListarPiezasPorReferencia = (referencia) => {
    obtenerPiezaPorReferencia(referencia)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_piezas', payload: response.data });
      })
      .then(() => {
        buscarPiezaPorReferenciaDispatch();
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const ListarPiezasPorNombre = (nombre) => {
    obtenerPiezaPorNombre(nombre)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_piezas', payload: response.data });
      })
      .then(() => {
        buscarPiezaPorNombreDispatch();
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
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
      ListarPiezasPorReferencia,
      ListarPiezasPorNombre,
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
      ListarPiezasPorReferencia,
      ListarPiezasPorNombre,
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
