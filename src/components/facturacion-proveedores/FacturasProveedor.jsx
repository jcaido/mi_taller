import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { FacturacionProveedoresContext } from '../../pages/FacturacionProveedores';
import NavigationButtonFacturacionProveedores from './NavigationButtonFacturacionProveedores';
import NuevaFacturaProveedorForm from './forms/NuevaFacturaProveedorForm';

export default function FacturasProveedor() {
  const
    {
      state,
      crearFacturaProveedorFormDispatch,
      editarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
    } = useContext(FacturacionProveedoresContext);

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonFacturacionProveedores
            crearFactura={crearFacturaProveedorFormDispatch}
            editarFactura={editarFacturaProveedorFormDispatch}
            eliminarFactura={eliminarFacturaProveedorFormDispatch}
          />
        </Box>
      </Grid>
      {state.formCrearFacturaProveedor
        ? (
          <>
            <Grid item md={2}>
              <Box>
                <NuevaFacturaProveedorForm />
              </Box>
            </Grid>
            <Grid item md={5}>
              {state.tablasAlbaranes ? 'Tabla albaranes pendientes de facturas' : null }
            </Grid>
            <Grid item md={5}>
              {state.tablasAlbaranes ? 'Tabla albaranes facturados' : null}
            </Grid>
            <Grid item md={5}>
              {state.tablasAlbaranes ? 'DATOS Y TOTALES FACTURA' : null}
            </Grid>
          </>
        ) : null}
      {state.formEditarFacturaProveedor ? <p>formulario editar factura</p> : null}
      {state.formEliminarFacturaProveedor ? <p>formulario eliminar factura</p> : null}
    </Grid>
  );
}
