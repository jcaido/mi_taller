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
      },
    });
  }

  const facturacionClientesProvider = useMemo(
    () => ({
      state,
      crearFacturaClienteFormDispatch,
      buscarParaEditarFacturaClienteFormDispatch,
      editarFacturaClienteFormDispatch,
      buscarParaEliminarFacturaClienteFormDispatch,
      eliminarFacturaClienteFormDispatch,
    }
    ),
    [
      state,
      crearFacturaClienteFormDispatch,
      buscarParaEditarFacturaClienteFormDispatch,
      editarFacturaClienteFormDispatch,
      buscarParaEliminarFacturaClienteFormDispatch,
      eliminarFacturaClienteFormDispatch,
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
