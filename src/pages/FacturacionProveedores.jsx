import React, { createContext, useReducer, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import useModal from '../hooks/useModal';
import ModalErrores from '../utils/ModalErrores';
import FacturasProveedor from '../components/facturacion-proveedores/FacturasProveedor';

export const FacturacionProveedoresContext = createContext();

export default function FacturacionProveedores() {
  const modal = useModal();

  const facturacionProveedoresInicial = {
    formCrearFacturaProveedor: false,
    formEditarFacturaProveedor: false,
    formEliminarFacturaProveedor: false,
    tablasAlbaranes: false,
    idFacturaProveedor: null,
  };

  const facturacionProveedoresReducer = (state, action) => {
    switch (action.type) {
      case 'facturasProveedor':
        return {
          ...state,
          formCrearFacturaProveedor: action.payload.formCrearFacturaProveedor,
          formEditarFacturaProveedor: action.payload.formEditarFacturaProveedor,
          formEliminarFacturaProveedor: action.payload.formEliminarFacturaProveedor,
          tablasAlbaranes: action.payload.tablasAlbaranes,
        };
      case 'obtener_id_factura_proveedor':
        return {
          ...state,
          idFacturaProveedor: action.payload,
        };
      default:
        return state;
    }
  };

  const [
    state, dispatch] = useReducer(facturacionProveedoresReducer, facturacionProveedoresInicial);

  function crearFacturaProveedorFormDispatch() {
    dispatch({
      type: 'facturasProveedor',
      payload: {
        formCrearFacturaProveedor: true,
        formEditarFacturaProveedor: false,
        formEliminarFacturaProveedor: false,
        tablasAlbaranes: false,
      },
    });
  }

  function editarFacturaProveedorFormDispatch() {
    dispatch({
      type: 'facturasProveedor',
      payload: {
        formCrearFacturaProveedor: false,
        formEditarFacturaProveedor: true,
        formEliminarFacturaProveedor: false,
        tablasAlbaranes: false,
      },
    });
  }

  function eliminarFacturaProveedorFormDispatch() {
    dispatch({
      type: 'facturasProveedor',
      payload: {
        formCrearFacturaProveedor: false,
        formEditarFacturaProveedor: false,
        formEliminarFacturaProveedor: true,
        tablasAlbaranes: false,
      },
    });
  }

  function tablasAlbaranesDispatch() {
    dispatch({
      type: 'facturasProveedor',
      payload: {
        formCrearFacturaProveedor: true,
        formEditarFacturaProveedor: false,
        formEliminarFacturaProveedor: false,
        tablasAlbaranes: true,
      },
    });
  }

  const obtenerIdFacturaProveedor = (id) => {
    dispatch({ type: 'obtener_id_factura_proveedor', payload: id });
  };

  const facturacionProveedoresProvider = useMemo(
    () => ({
      state,
      crearFacturaProveedorFormDispatch,
      editarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
      obtenerIdFacturaProveedor,
      tablasAlbaranesDispatch,
    }
    ),
    [
      state,
      crearFacturaProveedorFormDispatch,
      editarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
      obtenerIdFacturaProveedor,
      tablasAlbaranesDispatch,
    ],
  );

  return (
    <FacturacionProveedoresContext.Provider value={facturacionProveedoresProvider}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="h7" gutterBottom>FACTURACION PROVEEDORES</Typography>
          </Box>
          <Box>
            <FacturasProveedor />
          </Box>
        </Grid>
        <ModalErrores
          openError={modal.openError}
          message={modal.message}
          handleCloseError={modal.handleCloseError}
        />
      </Grid>
    </FacturacionProveedoresContext.Provider>
  );
}
