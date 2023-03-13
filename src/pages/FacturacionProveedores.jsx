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
  };

  const facturacionProveedoresReducer = (state, action) => {
    switch (action.type) {
      case 'facturasProveedor':
        return {
          ...state,
          formCrearFacturaProveedor: action.payload.formCrearFacturaProveedor,
          formEditarFacturaProveedor: action.payload.formEditarFacturaProveedor,
          formEliminarFacturaProveedor: action.payload.formEliminarFacturaProveedor,
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
      },
    });
  }

  const facturacionProveedoresProvider = useMemo(
    () => ({
      state,
      crearFacturaProveedorFormDispatch,
      editarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
    }
    ),
    [
      state,
      crearFacturaProveedorFormDispatch,
      editarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
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
