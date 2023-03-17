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
    idProveedor: null,
    fechaFacturaProveedor: null,
    numeroFacturaProveedor: null,
    nombreProveedor: null,
    cifNifProveedor: null,
    domicilioProveedor: null,
    codigoPostalProveedor: null,
    localidadProveedor: null,
    provinciaProveedor: null,
    tipoIVAFacturaProveedor: null,
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
      case 'obtener_id_proveedor':
        return {
          ...state,
          idProveedor: action.payload,
        };
      case 'obtener_fecha_factura_proveedor':
        return {
          ...state,
          fechaFacturaProveedor: action.payload,
        };
      case 'obtener_numero_factura_proveedor':
        return {
          ...state,
          numeroFacturaProveedor: action.payload,
        };
      case 'obtener_nombre_proveedor':
        return {
          ...state,
          nombreProveedor: action.payload,
        };
      case 'obtener_cif_nif_proveedor':
        return {
          ...state,
          cifNifProveedor: action.payload,
        };
      case 'obtener_domicilio_proveedor':
        return {
          ...state,
          domicilioProveedor: action.payload,
        };
      case 'obtener_codigo_postal_proveedor':
        return {
          ...state,
          codigoPostalProveedor: action.payload,
        };
      case 'obtener_localidad_proveedor':
        return {
          ...state,
          localidadProveedor: action.payload,
        };
      case 'obtener_provincia_proveedor':
        return {
          ...state,
          provinciaProveedor: action.payload,
        };
      case 'obtener_tipo_iva_factura_proveedor':
        return {
          ...state,
          tipoIVAFacturaProveedor: action.payload,
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

  const obtenerIdProveedor = (id) => {
    dispatch({ type: 'obtener_id_proveedor', payload: id });
  };

  const obtenerFechaFacturaProveedor = (fechaFactura) => {
    dispatch({ type: 'obtener_fecha_factura_proveedor', payload: fechaFactura });
  };

  const obtenerNumeroFacturaProveedor = (numeroFactura) => {
    dispatch({ type: 'obtener_numero_factura_proveedor', payload: numeroFactura });
  };

  const obtenerNombreProveedor = (nombreProveedor) => {
    dispatch({ type: 'obtener_nombre_proveedor', payload: nombreProveedor });
  };

  const obtenerCifNifProveedr = (cifNifProveedor) => {
    dispatch({ type: 'obtener_cif_nif_proveedor', payload: cifNifProveedor });
  };

  const obtenerDomicilioProveedor = (domicilioProveedor) => {
    dispatch({ type: 'obtener_domicilio_proveedor', payload: domicilioProveedor });
  };

  const obtenerCodigoPostalProveedor = (codigoPostalProveedor) => {
    dispatch({ type: 'obtener_codigo_postal_proveedor', payload: codigoPostalProveedor });
  };

  const obtenerLocalidadProveedor = (localidadProveedor) => {
    dispatch({ type: 'obtener_localidad_proveedor', payload: localidadProveedor });
  };

  const obtenerProvinciaProveedor = (provinciaProveedor) => {
    dispatch({ type: 'obtener_provincia_proveedor', payload: provinciaProveedor });
  };

  const obtenerTipoIvaFacturaProveedor = (tipoIVAFacturaProveedor) => {
    dispatch({ type: 'obtener_tipo_iva_factura_proveedor', payload: tipoIVAFacturaProveedor });
  };

  const facturacionProveedoresProvider = useMemo(
    () => ({
      state,
      crearFacturaProveedorFormDispatch,
      editarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
      obtenerIdFacturaProveedor,
      obtenerIdProveedor,
      obtenerFechaFacturaProveedor,
      obtenerNumeroFacturaProveedor,
      obtenerNombreProveedor,
      obtenerCifNifProveedr,
      obtenerDomicilioProveedor,
      obtenerCodigoPostalProveedor,
      obtenerLocalidadProveedor,
      obtenerProvinciaProveedor,
      obtenerTipoIvaFacturaProveedor,
      tablasAlbaranesDispatch,
    }
    ),
    [
      state,
      crearFacturaProveedorFormDispatch,
      editarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
      obtenerIdFacturaProveedor,
      obtenerIdProveedor,
      obtenerFechaFacturaProveedor,
      obtenerNumeroFacturaProveedor,
      obtenerNombreProveedor,
      obtenerCifNifProveedr,
      obtenerDomicilioProveedor,
      obtenerCodigoPostalProveedor,
      obtenerLocalidadProveedor,
      obtenerProvinciaProveedor,
      obtenerTipoIvaFacturaProveedor,
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
