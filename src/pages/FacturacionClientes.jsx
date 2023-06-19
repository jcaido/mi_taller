import React, { createContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import FacturasClientes from '../components/facturacion-clientes/FacturasClientes';
import { obtenerFacturaClientePorId } from '../services/axiosService';
import useModal from '../hooks/useModal';
import ModalErrores from '../utils/ModalErrores';

export const FacturacionClientesContext = createContext();

export default function FacturacionClientes() {
  const modal = useModal();

  const facturacionClientesInicial = {
    formCrearFacturaCliente: false,
    formBuscarParaEditarFacturaCliente: false,
    formEditarFacturaCliente: false,
    formBuscarParaEliminarFacturaCliente: false,
    formEliminarFacturaCliente: false,
    facturaPDF: false,
    facturaCliente: [],
    datosOrdenReparacion: false,
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
          datosOrdenReparacion: action.payload.datosOrdenReparacion,

        };
      case 'actualizar_factura_cliente':
        return {
          ...state,
          facturaCliente: action.payload,
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
        datosOrdenReparacion: false,
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
        datosOrdenReparacion: false,
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
        datosOrdenReparacion: false,
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
        datosOrdenReparacion: false,
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
        datosOrdenReparacion: false,
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
        datosOrdenReparacion: false,
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
        formEliminarFacturaCliente: false,
        facturaPDF: true,
        datosOrdenReparacion: false,
      },
    });
  }

  function datosOrdenReparacionDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: true,
        formBuscarParaEditarFacturaCliente: false,
        formEditarFacturaCliente: false,
        formBuscarParaEliminarFacturaCliente: false,
        formEliminarFacturaCliente: false,
        facturaPDF: false,
        datosOrdenReparacion: true,
      },
    });
  }

  function datosOrdenReparacionEditarDispatch() {
    dispatch({
      type: 'facturasCliente',
      payload: {
        formCrearFacturaCliente: false,
        formBuscarParaEditarFacturaCliente: false,
        formEditarFacturaCliente: true,
        formBuscarParaEliminarFacturaCliente: false,
        formEliminarFacturaCliente: false,
        facturaPDF: false,
        datosOrdenReparacion: true,
      },
    });
  }

  const ObtenerFacturaCliente = (id) => {
    obtenerFacturaClientePorId(id)
      .then((response) => {
        dispatch({ type: 'actualizar_factura_cliente', payload: response.data });
        editarFacturaClienteFormDispatch();
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

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
      ObtenerFacturaCliente,
      datosOrdenReparacionDispatch,
      datosOrdenReparacionEditarDispatch,
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
      ObtenerFacturaCliente,
      datosOrdenReparacionDispatch,
      datosOrdenReparacionEditarDispatch,
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
        <ModalErrores
          openError={modal.openError}
          message={modal.message}
          handleCloseError={modal.handleCloseError}
        />
      </Grid>
    </FacturacionClientesContext.Provider>
  );
}
