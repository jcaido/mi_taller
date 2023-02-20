import React, { createContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Proveedores from '../components/proveedores/Proveedores';
import { obtenerProveedores, obtenerProveedoresPorNombre, obtenerProveedorPorDniCif } from '../services/axiosService';
import useModal from '../hooks/useModal';
import ModalErrores from '../utils/ModalErrores';

export const AlmacenProveedoresContext = createContext();

export default function AlmacenProveedores() {
  const modal = useModal();

  const proveedoresInicial = {
    formCrearProveedor: false,
    formBuscarProveedor: false,
    formEditarProveedor: false,
    formEliminarProveedor: false,
    proveedorPorDniCif: false,
    proveedoresPorNombre: false,
    editarProveedor: false,
    listaProveedores: [],
  };

  const proveedoresReducer = (state, action) => {
    switch (action.type) {
      case 'proveedores':
        return {
          ...state,
          formCrearProveedor: action.payload.formCrearProveedor,
          formBuscarProveedor: action.payload.formBuscarProveedor,
          formEditarProveedor: action.payload.formEditarProveedor,
          formEliminarProveedor: action.payload.formEliminarProveedor,
          proveedorPorDniCif: action.payload.proveedorPorDniCif,
          proveedoresPorNombre: action.payload.proveedoresPorNombre,
          editarProveedor: action.payload.editarProveedor,
        };
      case 'actualizar_lista_proveedores':
        return {
          ...state,
          listaProveedores: action.payload,
        };
      case 'cerrar_formulario_editar_proveedor':
        return {
          ...state,
          editarProveedor: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(proveedoresReducer, proveedoresInicial);

  function crearProveedorFormDispatch() {
    dispatch({
      type: 'proveedores',
      payload: {
        formCrearProveedor: true,
        formBuscarProveedor: false,
        formEditarProveedor: false,
        formEliminarProveedor: false,
        proveedorPorDniCif: false,
        proveedoresPorNombre: false,
        editarProveedor: false,
      },
    });
  }

  function buscarProveedorFormDispatch() {
    dispatch({
      type: 'proveedores',
      payload: {
        formCrearProveedor: false,
        formBuscarProveedor: true,
        formEditarProveedor: false,
        formEliminarProveedor: false,
        proveedorPorDniCif: false,
        proveedoresPorNombre: false,
        editarProveedor: false,
      },
    });
  }

  function buscarProveedorParaEditarDispatch() {
    dispatch({
      type: 'proveedores',
      payload: {
        formCrearProveedor: false,
        formBuscarProveedor: false,
        formEditarProveedor: true,
        formEliminarProveedor: false,
        proveedorPorDniCif: false,
        proveedoresPorNombre: false,
        editarProveedor: false,
      },
    });
  }

  function buscarProveedorParaEliminarDispatch() {
    dispatch({
      type: 'proveedores',
      payload: {
        formCrearProveedor: false,
        formBuscarProveedor: false,
        formEditarProveedor: false,
        formEliminarProveedor: true,
        proveedorPorDniCif: false,
        proveedoresPorNombre: false,
        editarProveedor: false,
      },
    });
  }

  function editarProveedorFormDispatch() {
    dispatch({
      type: 'proveedores',
      payload: {
        formCrearProveedor: false,
        formBuscarProveedor: false,
        formEditarProveedor: true,
        formEliminarProveedor: false,
        proveedorPorDniCif: false,
        proveedoresPorNombre: false,
        editarProveedor: true,
      },
    });
  }

  function buscarProveedorPorDNICifDispatch() {
    dispatch({
      type: 'proveedores',
      payload: {
        formCrearProveedor: false,
        formBuscarProveedor: true,
        formEditarProveedor: false,
        formEliminarProveedor: false,
        proveedorPorDniCif: true,
        proveedoresPorNombre: false,
        editarProveedor: false,
      },
    });
  }

  function buscarProveedorPorNombreDispatch() {
    dispatch({
      type: 'proveedores',
      payload: {
        formCrearProveedor: false,
        formBuscarProveedor: true,
        formEditarProveedor: false,
        formEliminarProveedor: false,
        proveedorPorDniCif: false,
        proveedoresPorNombre: true,
        editarProveedor: false,
      },
    });
  }

  function eliminarProveedorFormDispatch() {
    dispatch({
      type: 'proveedores',
      payload: {
        formCrearProveedor: false,
        formBuscarProveedor: false,
        formEditarProveedor: false,
        formEliminarProveedor: true,
        proveedorPorDniCif: false,
        proveedoresPorNombre: false,
        editarProveedor: false,
      },
    });
  }

  const ListarProveedores = () => {
    obtenerProveedores()
      .then((response) => {
        dispatch({ type: 'actualizar_lista_proveedores', payload: response.data });
      })
      .catch(() => {
        // alert(`ERROR: ${error.response.data.mensaje}`);
      });
  };

  const ListarProveedoresPorDniCif = (dniCif) => {
    obtenerProveedorPorDniCif(dniCif)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_proveedores', payload: response.data });
      })
      .then(() => {
        buscarProveedorPorDNICifDispatch();
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const ListarProveedoresPorNombre = (nombre) => {
    obtenerProveedoresPorNombre(nombre)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_proveedores', payload: response.data });
      })
      .then(() => {
        buscarProveedorPorNombreDispatch();
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const ObtenerProveedorPorDniCifParaEditar = (dniCif) => {
    obtenerProveedorPorDniCif(dniCif)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_proveedores', payload: response.data });
      })
      .then(() => {
        editarProveedorFormDispatch();
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const CerrarFormEditarProveedor = () => {
    dispatch({ type: 'cerrar_formulario_editar_proveedor', payload: false });
  };

  const proveedoresProviderValue = useMemo(
    () => ({
      state,
      crearProveedorFormDispatch,
      buscarProveedorFormDispatch,
      buscarProveedorParaEditarDispatch,
      buscarProveedorParaEliminarDispatch,
      editarProveedorFormDispatch,
      eliminarProveedorFormDispatch,
      ListarProveedores,
      ListarProveedoresPorDniCif,
      ListarProveedoresPorNombre,
      ObtenerProveedorPorDniCifParaEditar,
      CerrarFormEditarProveedor,
    }
    ),
    [
      state,
      crearProveedorFormDispatch,
      buscarProveedorFormDispatch,
      buscarProveedorParaEditarDispatch,
      buscarProveedorParaEliminarDispatch,
      editarProveedorFormDispatch,
      eliminarProveedorFormDispatch,
      ListarProveedores,
      ListarProveedoresPorDniCif,
      ListarProveedoresPorNombre,
      ObtenerProveedorPorDniCifParaEditar,
      CerrarFormEditarProveedor,
    ],
  );

  return (
    <AlmacenProveedoresContext.Provider value={proveedoresProviderValue}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="h7" gutterBottom>PROVEEDORES</Typography>
          </Box>
          <Box>
            <Proveedores />
          </Box>
        </Grid>
        <ModalErrores
          openError={modal.openError}
          message={modal.message}
          handleCloseError={modal.handleCloseError}
        />
      </Grid>
    </AlmacenProveedoresContext.Provider>
  );
}
