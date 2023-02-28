import React, { createContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import useModal from '../hooks/useModal';
import ModalErrores from '../utils/ModalErrores';
import Entradas from '../components/entradas/Entradas';
import { obtenerAlbaranesEntrada, obtenerAlbaranPorId, obtenerProveedorPorDniCif } from '../services/axiosService';

export const AlmacenEntradasContext = createContext();

export default function AlmacenEntradas() {
  const modal = useModal();

  const entradasInicial = {
    formCrearAlbaranEntradas: false,
    proveedor: false,
    formSeleccionarAlbaran: false,
    formNuevaEntrada: false,
    viewDetalleAlbaran: false,
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
          formSeleccionarAlbaran: action.payload.formSeleccionarAlbaran,
          formNuevaEntrada: action.payload.formNuevaEntrada,
          viewDetalleAlbaran: action.payload.viewDetalleAlbaran,
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
      case 'cerrar_formulario_nueva_entrada':
        return {
          ...state,
          formNuevaEntrada: action.payload,
        };
      case 'cerrar_vista_detalle_albaran':
        return {
          ...state,
          viewDetalleAlbaran: action.payload,
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
        formSeleccionarAlbaran: false,
        formNuevaEntrada: false,
        viewDetalleAlbaran: false,
      },
    });
  }

  function buscarProveedorPorDniCifDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: true,
        proveedor: true,
        formSeleccionarAlbaran: false,
        formNuevaEntrada: false,
        viewDetalleAlbaran: false,
      },
    });
  }

  function addEntradasFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: false,
        proveedor: false,
        formSeleccionarAlbaran: true,
        formNuevaEntrada: false,
        viewDetalleAlbaran: false,
      },
    });
  }

  function NuevaEntradaYDetalleFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: false,
        proveedor: false,
        formSeleccionarAlbaran: true,
        formNuevaEntrada: true,
        viewDetalleAlbaran: true,
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

  const ObtenerAlbaranPorId = (id) => {
    obtenerAlbaranPorId(id)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_albaranes', payload: response.data });
      })
      .then(() => {
        NuevaEntradaYDetalleFormDispatch();
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const CerrarFormNuevaEntradaYDetalleAlbaran = () => {
    dispatch({ type: 'cerrar_formulario_nueva_entrada', payload: false });
    dispatch({ type: 'cerrar_vista_detalle_albaran', payload: false });
  };

  const ObtenerAlbaranPorIdParaActualizar = (id) => {
    obtenerAlbaranPorId(id)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_albaranes', payload: response.data });
      });
  };

  const albaranesEntradaProvider = useMemo(
    () => ({
      state,
      crearAlbaranEntradasFormDispatch,
      ListarAlbaranesEntrada,
      ObtenerProveedorPorDniCif,
      CerrarFormBuscarProveedor,
      addEntradasFormDispatch,
      ObtenerAlbaranPorId,
      CerrarFormNuevaEntradaYDetalleAlbaran,
      ObtenerAlbaranPorIdParaActualizar,
    }
    ),
    [
      state,
      crearAlbaranEntradasFormDispatch,
      ListarAlbaranesEntrada,
      ObtenerProveedorPorDniCif,
      CerrarFormBuscarProveedor,
      addEntradasFormDispatch,
      ObtenerAlbaranPorId,
      CerrarFormNuevaEntradaYDetalleAlbaran,
      ObtenerAlbaranPorIdParaActualizar,
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
