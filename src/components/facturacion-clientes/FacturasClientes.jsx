import React, { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import NavigationButtonFacturacionClientes from './NavigationButtonFacturacionClientes';
import { FacturacionClientesContext } from '../../pages/FacturacionClientes';
import NuevaFacturaClienteForm from './forms/NuevaFacturaClienteForm';
import TablaOrdenesReparacionNoFacturadas from './TablaOrdenesReparacionNoFacturadas';
import {
  nuevaFacturaCliente,
  obtenerOrdenesReparacionCerradasPendientesFacturas,
  obtenerOrdenReparacionPorIdCompleta, ultimaFacturaCliente,
} from '../../services/axiosService';
import InformacionOrdenReparacion from './InformacionOrdenReparacion';
import FacturaClientePDF from './FacturaClientePDF';

export default function FacturasClientes() {
  const {
    state,
    crearFacturaClienteFormDispatch,
    ocultarFacturaClienteFormDispatch,
    buscarParaEditarFacturaClienteFormDispatch,
    buscarParaEliminarFacturaClienteFormDispatch,
    facturaPDFDispatch,
  } = useContext(FacturacionClientesContext);

  const [ordenesReeparacionNoFacturadas, setOrdenesReparacionNoFacturadas] = useState([]);
  const [ordenReparacionAFacturar, setOrdenReparacionAFacturar] = useState([]);

  const [datosOrdenReparacion, setDatosOrdenReparacion] = useState(false);

  const [ultimaFactura, setUltimaFactura] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(true);

  const obtenerOrdenesReparacionNoFacturadas = () => {
    obtenerOrdenesReparacionCerradasPendientesFacturas()
      .then((response) => {
        setOrdenesReparacionNoFacturadas(response.data);
      });
  };

  const seleccionarOrdenReparacion = (idOrden) => {
    obtenerOrdenReparacionPorIdCompleta(idOrden)
      .then((response) => {
        setDatosOrdenReparacion(true);
        setOrdenReparacionAFacturar(response.data);
        setDisabled(false);
      });
  };

  const handleSubmitNuevaFacturaForm = (
    fechaFactura,
    tipoIVA,
    idPropietario,
    idOrdenReparacion,
  ) => {
    nuevaFacturaCliente(fechaFactura, tipoIVA, idPropietario, idOrdenReparacion)
      .then(() => {
        ultimaFacturaCliente()
          .then((response) => {
            ocultarFacturaClienteFormDispatch();
            facturaPDFDispatch();
            setUltimaFactura(response.data);
          });
      })
      .catch(() => {
        alert('error');
      });
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
                  handleSubmitNuevaFacturaForm={handleSubmitNuevaFacturaForm}
                  ordenReparacionAFacturar={ordenReparacionAFacturar}
                  disabled={disabled}
                  setDisabled={setDisabled}
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
                <Grid item md={6}>
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
      {state.facturaPDF
        ? (
          <Grid item md={10}>
            <Box>
              <PDFViewer style={{ width: '90%', height: '90vh', marginLeft: '80px' }}>
                <FacturaClientePDF factura={ultimaFactura} />
              </PDFViewer>
            </Box>
          </Grid>
        ) : null}
      {state.formBuscarParaEditarFacturaCliente ? <p>form editar factura cliente</p> : null}
      {state.formBuscarParaEliminarFacturaCliente ? <p>form eliminar factura cliente</p> : null}
    </Grid>
  );
}
