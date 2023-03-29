import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonFacturacionClientes from './NavigationButtonFacturacionClientes';
import { FacturacionClientesContext } from '../../pages/FacturacionClientes';

export default function FacturasClientes() {
  const {
    state,
    crearFacturaClienteFormDispatch,
    buscarParaEditarFacturaClienteFormDispatch,
    buscarParaEliminarFacturaClienteFormDispatch,
  } = useContext(FacturacionClientesContext);

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonFacturacionClientes
            crearFactura={crearFacturaClienteFormDispatch}
            editarFactura={buscarParaEditarFacturaClienteFormDispatch}
            eliminarFactura={buscarParaEliminarFacturaClienteFormDispatch}
          />
        </Box>
      </Grid>
      {state.formCrearFacturaCliente ? <p>crear factura cliente</p> : null}
      {state.formBuscarParaEditarFacturaCliente ? <p>form editar factura cliente</p> : null}
      {state.formBuscarParaEliminarFacturaCliente ? <p>form eliminar factura cliente</p> : null}
    </Grid>
  );
}
