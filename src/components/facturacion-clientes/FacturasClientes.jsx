import React, { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonFacturacionClientes from './NavigationButtonFacturacionClientes';
import { FacturacionClientesContext } from '../../pages/FacturacionClientes';
import NuevaFacturaClienteForm from './forms/NuevaFacturaClienteForm';
import TablaOrdenesReparacionNoFacturadas from './TablaOrdenesReparacionNoFacturadas';
import { obtenerOrdenesReparacionCerradasPendientesFacturas, obtenerOrdenReparacionPorIdCompleta } from '../../services/axiosService';
import InformacionOrdenReparacion from './InformacionOrdenReparacion';

export default function FacturasClientes() {
  const {
    state,
    crearFacturaClienteFormDispatch,
    buscarParaEditarFacturaClienteFormDispatch,
    buscarParaEliminarFacturaClienteFormDispatch,
  } = useContext(FacturacionClientesContext);

  const [ordenesReeparacionNoFacturadas, setOrdenesReparacionNoFacturadas] = useState([]);
  const [ordenReparacionAFacturar, setOrdenReparacionAFacturar] = useState([]);

  const [inputOrdenReparacion, setInputOrdenReparacion] = useState();
  const [labelOrdenReparacion, setLabelOrdenReparacion] = useState(true);
  const [datosOrdenReparacion, setDatosOrdenReparacion] = useState(false);

  const obtenerOrdenesReparacionNoFacturadas = () => {
    obtenerOrdenesReparacionCerradasPendientesFacturas()
      .then((response) => {
        setOrdenesReparacionNoFacturadas(response.data);
      });
  };

  const seleccionarOrdenReparacion = (idOrden) => {
    setInputOrdenReparacion(idOrden);
    setLabelOrdenReparacion(false);
    obtenerOrdenReparacionPorIdCompleta(idOrden)
      .then((response) => {
        setDatosOrdenReparacion(true);
        setOrdenReparacionAFacturar(response.data);
      });
  };

  const establecerLabelOrdenFormNuevaFactura = () => {
    setLabelOrdenReparacion(true);
  };

  const establecerDatosOrdenReparacionTrue = () => {
    setDatosOrdenReparacion(true);
  };

  const estableerDatosOrdenReparacionFalse = () => {
    setDatosOrdenReparacion(false);
  };

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
      {state.formCrearFacturaCliente
        ? (
          <>
            <Grid item md={2}>
              <Box>
                <NuevaFacturaClienteForm
                  inputOrdenReparacion={inputOrdenReparacion}
                  labelOrdenReparacion={labelOrdenReparacion}
                  establecerLabelOrdenFormNuevaFactura={establecerLabelOrdenFormNuevaFactura}
                />
              </Box>
            </Grid>
            <Grid item md={10}>
              <Box>
                <TablaOrdenesReparacionNoFacturadas
                  obtenerOrdenesReparacionNoFacturadas={obtenerOrdenesReparacionNoFacturadas}
                  ordenesReparacionNoFacturadas={ordenesReeparacionNoFacturadas}
                  seleccionarOrdenReparacion={seleccionarOrdenReparacion}
                />
              </Box>
            </Grid>
            {datosOrdenReparacion
              ? (
                <Grid item md={12}>
                  <Box>
                    <InformacionOrdenReparacion
                      ordenReparacionAFacturar={ordenReparacionAFacturar}
                      establecerDatosOrdenReparacionTrue={establecerDatosOrdenReparacionTrue}
                      estableerDatosOrdenReparacionFalse={estableerDatosOrdenReparacionFalse}
                    />
                  </Box>
                </Grid>
              ) : null}
          </>
        ) : null}
      {state.formBuscarParaEditarFacturaCliente ? <p>form editar factura cliente</p> : null}
      {state.formBuscarParaEliminarFacturaCliente ? <p>form eliminar factura cliente</p> : null}
    </Grid>
  );
}
