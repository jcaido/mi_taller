import React, { createContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import useModal from '../hooks/useModal';
import ModalErrores from '../utils/ModalErrores';
import Entradas from '../components/entradas/Entradas';
import { obtenerAlbaranesEntrada, obtenerProveedorPorDniCif } from '../services/axiosService';

export const AlmacenEntradasContext = createContext();

export default function AlmacenEntradas() {
  const modal = useModal();

  const entradasInicial = {
    formCrearAlbaranEntradas: false,
    proveedor: false,
    listaProveedores: [],
    listaPiezas: [],
    listaAlbaranesEntrada: [],
  };

  const albaranEntradasReducer = (state, action) => {
    switch (action.type) {
      case 'albaranesEntrada':
        return {
          ...state,
          formCrearAlbaranEntradas: action.payload.formCrearAlbaranEntradas,
          proveedor: action.payload.proveedor,
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
      case 'actualizar_lista_albaranes':
        return {
          ...state,
          listaAlbaranesEntrada: action.payload,
        };
      case 'cerrar_formulario_buscar_proveedor':
        return {
          ...state,
          proveedor: action.payload,
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
        proveedor: false,
      },
    });
  }

  function buscarProveedorPorDniCifDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: true,
        proveedor: true,
      },
    });
  }

  const ListarAlbaranesEntrada = () => {
    obtenerAlbaranesEntrada()
      .then((response) => {
        dispatch({ type: 'actualizar_lista_albaranes', payload: response.data });
      })
      .catch(() => {
        modal.handleOpenError('Something went wrong');
      });
  };

  const ObtenerProveedorPorDniCif = (dniCif) => {
    obtenerProveedorPorDniCif(dniCif)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_proveedores', payload: response.data });
      })
      .then(() => {
        buscarProveedorPorDniCifDispatch();
      })
      .catch((error) => {
        if (error.response.status === 404) {
          modal.handleOpenError(error.response.data.mensaje);
        }
        if (error.response.status === 400) {
          modal.handleOpenError('datos invalidos');
        }
      });
  };

  const CerrarFormBuscarProveedor = () => {
    dispatch({ type: 'cerrar_formulario_buscar_proveedor', payload: false });
  };

  const albaranesEntradaProvider = useMemo(
    () => ({
      state,
      crearAlbaranEntradasFormDispatch,
      ListarAlbaranesEntrada,
      ObtenerProveedorPorDniCif,
      CerrarFormBuscarProveedor,
    }
    ),
    [
      state,
      crearAlbaranEntradasFormDispatch,
      ListarAlbaranesEntrada,
      ObtenerProveedorPorDniCif,
      CerrarFormBuscarProveedor,
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
