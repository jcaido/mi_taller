import React, { createContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import useModal from '../hooks/useModal';
import ModalErrores from '../utils/ModalErrores';
import Entradas from '../components/entradas/Entradas';

export const AlmacenEntradasContext = createContext();

export default function AlmacenEntradas() {
  const modal = useModal();

  const entradasInicial = {
    formCrearAlbaranEntradas: false,
    formBuscarProveedor: false,
    formBuscarPieza: false,
    listaProveedores: [],
    listaPiezas: [],
  };

  const albaranEntradasReducer = (state, action) => {
    switch (action.type) {
      case 'albaranesEntrada':
        return {
          ...state,
          formCrearAlbaranEntradas: action.payload.formCrearAlbaranEntradas,
          formBuscarProveedor: action.payload.formBuscarProveedor,
          formBuscarPieza: action.payload.formBuscarPieza,
        };
      case 'actualizar_lista_proveedores':
        return {
          ...state,
          listaProveedores: action.payload,
        };
      case 'actualizar_lista_piezas':
        return {
          ...state,
          listaPiezas: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(albaranEntradasReducer, entradasInicial);

  function crearAlbaranEntradasFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: true,
        formBuscarProveedor: false,
        formBuscarPieza: false,
      },
    });
  }

  function buscarProveedorFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: true,
        formBuscarProveedor: true,
        formBuscarPieza: false,
      },
    });
  }

  function buscarPiezaFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: true,
        formBuscarProveedor: false,
        formBuscarPieza: true,
      },
    });
  }

  const albaranesEntradaProvider = useMemo(
    () => ({
      state,
      crearAlbaranEntradasFormDispatch,
      buscarProveedorFormDispatch,
      buscarPiezaFormDispatch,
    }
    ),
    [
      state,
      crearAlbaranEntradasFormDispatch,
      buscarProveedorFormDispatch,
      buscarPiezaFormDispatch,
    ],
  );

  return (
    <AlmacenEntradasContext.Provider value={albaranesEntradaProvider}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="h7" gutterBottom>ENTRADAS</Typography>
          </Box>
          <Box>
            <Entradas />
          </Box>
        </Grid>
        <ModalErrores
          openError={modal.openError}
          message={modal.message}
          handleCloseError={modal.handleCloseError}
        />
      </Grid>
    </AlmacenEntradasContext.Provider>
  );
}
