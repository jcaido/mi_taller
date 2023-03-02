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
    formSeleccionarParaEditar: false,
    formEditarAlbaran: false,
    formSeleccionarParaEliminar: false,
    formEliminarAlbaran: false,
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
          formSeleccionarParaEditar: action.payload.formSeleccionarParaEditar,
          formEditarAlbaran: action.payload.formEditarAlbaran,
          formSeleccionarParaEliminar: action.payload.formSeleccionarParaEliminar,
          formEliminarAlbaran: action.payload.formEliminarAlbaran,
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
      case 'cerrar_formulario_editar_albaran':
        return {
          ...state,
          formEditarAlbaran: action.payload,
        };
      case 'cerrar_formulario_eliminar_albaran':
        return {
          ...state,
          formEliminarAlbaran: action.payload,
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
        formSeleccionarParaEditar: false,
        formEditarAlbaran: false,
        formSeleccionarParaEliminar: false,
        formEliminarAlbaran: false,
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
        formSeleccionarParaEditar: false,
        formEditarAlbaran: false,
        formSeleccionarParaEliminar: false,
        formEliminarAlbaran: false,
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
        formSeleccionarParaEditar: false,
        formEditarAlbaran: false,
        formSeleccionarParaEliminar: false,
        formEliminarAlbaran: false,
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
        formSeleccionarParaEditar: false,
        formEditarAlbaran: false,
        formSeleccionarParaEliminar: false,
        formEliminarAlbaran: false,
        proveedor: false,
        formSeleccionarAlbaran: true,
        formNuevaEntrada: true,
        viewDetalleAlbaran: true,
      },
    });
  }

  function seleccionarParaEditarAlbaranFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: false,
        formSeleccionarParaEditar: true,
        formEditarAlbaran: false,
        formSeleccionarParaEliminar: false,
        formEliminarAlbaran: false,
        proveedor: false,
        formSeleccionarAlbaran: false,
        formNuevaEntrada: false,
        viewDetalleAlbaran: false,
      },
    });
  }

  function seleccionarParaEliminrAlbaranFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: false,
        formSeleccionarParaEditar: false,
        formEditarAlbaran: false,
        formSeleccionarParaEliminar: true,
        formEliminarAlbaran: false,
        proveedor: false,
        formSeleccionarAlbaran: false,
        formNuevaEntrada: false,
        viewDetalleAlbaran: false,
      },
    });
  }

  function editarAlbaranFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: false,
        formSeleccionarParaEditar: true,
        formEditarAlbaran: true,
        formSeleccionarParaEliminar: false,
        formEliminarAlbaran: false,
        proveedor: false,
        formSeleccionarAlbaran: false,
        formNuevaEntrada: false,
        viewDetalleAlbaran: false,
      },
    });
  }

  // eslint-disable-next-line no-unused-vars
  function eliminarAlbaranFormDispatch() {
    dispatch({
      type: 'albaranesEntrada',
      payload: {
        formCrearAlbaranEntradas: false,
        formSeleccionarParaEditar: false,
        formEditarAlbaran: false,
        formSeleccionarParaEliminar: true,
        formEliminarAlbaran: true,
        proveedor: false,
        formSeleccionarAlbaran: false,
        formNuevaEntrada: false,
        viewDetalleAlbaran: false,
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
        if (id !== '') {
          dispatch({ type: 'actualizar_lista_albaranes', payload: response.data });
          NuevaEntradaYDetalleFormDispatch();
        }
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const ObtenerAlbaranPorIdParaModificar = (id) => {
    obtenerAlbaranPorId(id)
      .then((response) => {
        if (response.data.facturado === true) {
          modal.handleOpenError('el  albarán ya está facturado');
        } else if (id !== '') {
          dispatch({ type: 'actualizar_lista_albaranes', payload: response.data });
          editarAlbaranFormDispatch();
        }
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const ObtenerAlbaranPorIdParaEliminar = (id) => {
    obtenerAlbaranPorId(id)
      .then((response) => {
        if (response.data.facturado === true) {
          modal.handleOpenError('el  albarán ya está facturado');
        } else if (id !== '') {
          dispatch({ type: 'actualizar_lista_albaranes', payload: response.data });
          eliminarAlbaranFormDispatch();
        }
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

  const CerrarFormEditarAlbaran = () => {
    dispatch({ type: 'cerrar_formulario_editar_albaran', payload: false });
  };

  const CerrarFormEliminarAlbaran = () => {
    dispatch({ type: 'cerrar_formulario_eliminar_albaran', payload: false });
  };

  const albaranesEntradaProvider = useMemo(
    () => ({
      state,
      crearAlbaranEntradasFormDispatch,
      seleccionarParaEditarAlbaranFormDispatch,
      seleccionarParaEliminrAlbaranFormDispatch,
      ListarAlbaranesEntrada,
      ObtenerProveedorPorDniCif,
      CerrarFormBuscarProveedor,
      addEntradasFormDispatch,
      ObtenerAlbaranPorId,
      ObtenerAlbaranPorIdParaModificar,
      ObtenerAlbaranPorIdParaEliminar,
      CerrarFormNuevaEntradaYDetalleAlbaran,
      ObtenerAlbaranPorIdParaActualizar,
      CerrarFormEditarAlbaran,
      CerrarFormEliminarAlbaran,
    }
    ),
    [
      state,
      crearAlbaranEntradasFormDispatch,
      seleccionarParaEditarAlbaranFormDispatch,
      seleccionarParaEliminrAlbaranFormDispatch,
      ListarAlbaranesEntrada,
      ObtenerProveedorPorDniCif,
      CerrarFormBuscarProveedor,
      addEntradasFormDispatch,
      ObtenerAlbaranPorId,
      ObtenerAlbaranPorIdParaModificar,
      ObtenerAlbaranPorIdParaEliminar,
      CerrarFormNuevaEntradaYDetalleAlbaran,
      ObtenerAlbaranPorIdParaActualizar,
      CerrarFormEditarAlbaran,
      CerrarFormEliminarAlbaran,
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
