import React, { createContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Proveedores from '../components/proveedores/Proveedores';
import { obtenerProveedores } from '../services/axiosService';

export const AlmacenProveedoresContext = createContext();

export default function AlmacenProveedores() {
  const proveedoresInicial = {
    formCrearProveedor: false,
    formBuscarProveedor: false,
    formEditarProveedor: false,
    formEliminarProveedor: false,
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
        };
      case 'actualizar_lista_proveedores':
        return {
          ...state,
          listaProveedores: action.payload,
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

  const proveedoresProviderValue = useMemo(
    () => ({
      state,
      crearProveedorFormDispatch,
      buscarProveedorFormDispatch,
      editarProveedorFormDispatch,
      eliminarProveedorFormDispatch,
      ListarProveedores,
    }
    ),
    [
      state,
      crearProveedorFormDispatch,
      buscarProveedorFormDispatch,
      editarProveedorFormDispatch,
      eliminarProveedorFormDispatch,
      ListarProveedores,
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
      </Grid>
    </AlmacenProveedoresContext.Provider>
  );
}
