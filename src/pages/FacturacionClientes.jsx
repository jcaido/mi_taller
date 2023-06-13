import React, { createContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import FacturasClientes from '../components/facturacion-clientes/FacturasClientes';

export const FacturacionClientesContext = createContext();

export default function FacturacionClientes() {
  const facturacionClientesInicial = {
    formCrearFacturaCliente: false,
    formBuscarParaEditarFacturaCliente: false,
    formEditarFacturaCliente: false,
    formBuscarParaEliminarFacturaCliente: false,
    formEliminarFacturaCliente: false,
    facturaPDF: false,
  };

  const facturacionClientesReducer = (state, action) => {
    switch (action.type) {
      case 'facturasCliente':
        return {
          ...state,
          formCrearFacturaCliente: action.payload.formCrearFacturaCliente,
          formBuscarParaEditarFacturaCliente: action.payload.formBuscarParaEditarFacturaCliente,
          formEditarFacturaCliente: action.payload.formEditarFacturaCliente,
          formBuscarParaEliminarFacturaCliente: action.payload.formBuscarParaEliminarFacturaCliente,
          formEliminarFacturaCliente: action.payload.formEliminarFacturaCliente,
          facturaPDF: action.payload.facturaPDF,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(facturacionClientesReducer, facturacionClientesInicial);

  function crearFacturaClienteFormDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: true,
        formBuscarParaEditarFacturaCliente: false,
        formEditarFacturaCliente: false,
        formBuscarParaEliminarFacturaCliente: false,
        formEliminarFacturaCliente: false,
        facturaPDF: false,
      },
    });
  }

  function ocultarFacturaClienteFormDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: false,
        formBuscarParaEditarFacturaCliente: false,
        formEditarFacturaCliente: false,
        formBuscarParaEliminarFacturaCliente: false,
        formEliminarFacturaCliente: false,
        facturaPDF: false,
      },
    });
  }

  function buscarParaEditarFacturaClienteFormDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: false,
        formBuscarParaEditarFacturaCliente: true,
        formEditarFacturaCliente: false,
        formBuscarParaEliminarFacturaCliente: false,
        formEliminarFacturaCliente: false,
        facturaPDF: false,
      },
    });
  }

  function editarFacturaClienteFormDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: false,
        formBuscarParaEditarFacturaCliente: false,
        formEditarFacturaCliente: true,
        formBuscarParaEliminarFacturaCliente: false,
        formEliminarFacturaCliente: false,
        facturaPDF: false,
      },
    });
  }

  function buscarParaEliminarFacturaClienteFormDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: false,
        formBuscarParaEditarFacturaCliente: false,
        formEditarFacturaCliente: false,
        formBuscarParaEliminarFacturaCliente: true,
        formEliminarFacturaCliente: false,
        facturaPDF: false,
      },
    });
  }

  function eliminarFacturaClienteFormDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: false,
        formBuscarParaEditarFacturaCliente: false,
        formEditarFacturaCliente: false,
        formBuscarParaEliminarFacturaCliente: false,
        formEliminarFacturaCliente: true,
        facturaPDF: false,
      },
    });
  }

  function facturaPDFDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: false,
        formBuscarParaEditarFacturaCliente: false,
        formEditarFacturaCliente: false,
        formBuscarParaEliminarFacturaCliente: false,
        formEliminarFacturaCliente: true,
        facturaPDF: true,
      },
    });
  }

  const facturacionClientesProvider = useMemo(
    () => ({
      state,
      crearFacturaClienteFormDispatch,
      ocultarFacturaClienteFormDispatch,
      buscarParaEditarFacturaClienteFormDispatch,
      editarFacturaClienteFormDispatch,
      buscarParaEliminarFacturaClienteFormDispatch,
      eliminarFacturaClienteFormDispatch,
      facturaPDFDispatch,
    }
    ),
    [
      state,
      crearFacturaClienteFormDispatch,
      ocultarFacturaClienteFormDispatch,
      buscarParaEditarFacturaClienteFormDispatch,
      editarFacturaClienteFormDispatch,
      buscarParaEliminarFacturaClienteFormDispatch,
      eliminarFacturaClienteFormDispatch,
      facturaPDFDispatch,
    ],
  );

  return (
    <FacturacionClientesContext.Provider value={facturacionClientesProvider}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="h7" gutterBottom>FACTURACION CLIENTES</Typography>
          </Box>
          <Box>
            <FacturasClientes />
          </Box>
        </Grid>
      </Grid>
    </FacturacionClientesContext.Provider>
  );
}
