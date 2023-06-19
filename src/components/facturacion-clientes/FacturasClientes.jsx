import React, { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import NavigationButtonFacturacionClientes from './NavigationButtonFacturacionClientes';
import { FacturacionClientesContext } from '../../pages/FacturacionClientes';
import NuevaFacturaClienteForm from './forms/NuevaFacturaClienteForm';
import TablaOrdenesReparacionNoFacturadas from './TablaOrdenesReparacionNoFacturadas';
import {
  modificarFacturaCliente,
  nuevaFacturaCliente,
  obtenerFacturaClientePorId,
  obtenerOrdenesReparacionCerradasPendientesFacturas,
  obtenerOrdenReparacionPorIdCompleta, ultimaFacturaCliente,
} from '../../services/axiosService';
import InformacionOrdenReparacion from './InformacionOrdenReparacion';
import FacturaClientePDF from './FacturaClientePDF';
import BuscarPorUnInput from '../BuscarPorUnInput';
import EditarFacturaClienteForm from './forms/EditarFacturaClienteForm';
import useModal from '../../hooks/useModal';
import ModalErrores from '../../utils/ModalErrores';

export default function FacturasClientes() {
  const {
    state,
    crearFacturaClienteFormDispatch,
    ocultarFacturaClienteFormDispatch,
    buscarParaEditarFacturaClienteFormDispatch,
    buscarParaEliminarFacturaClienteFormDispatch,
    facturaPDFDispatch,
    ObtenerFacturaCliente,
    datosOrdenReparacionDispatch,
    datosOrdenReparacionEditarDispatch,
  } = useContext(FacturacionClientesContext);

  const modal = useModal();

  const [ordenesReeparacionNoFacturadas, setOrdenesReparacionNoFacturadas] = useState([]);
  const [ordenReparacionAFacturar, setOrdenReparacionAFacturar] = useState([]);

  const [ultimaFactura, setUltimaFactura] = useState([]);

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
        datosOrdenReparacionDispatch();
        setOrdenReparacionAFacturar(response.data);
        setDisabled(false);
      });
  };

  const seleccionarOrdenReparacionEditar = (idOrden) => {
    obtenerOrdenReparacionPorIdCompleta(idOrden)
      .then((response) => {
        datosOrdenReparacionEditarDispatch();
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

  const handleSubmitEditarFacturaForm = (
    id,
    fechaFactura,
    tipoIva,
    idOrdenReparacion,
  ) => {
    modificarFacturaCliente(id, fechaFactura, tipoIva, idOrdenReparacion)
      .then(() => {
        obtenerFacturaClientePorId(id)
          .then((response) => {
            ocultarFacturaClienteFormDispatch();
            facturaPDFDispatch();
            setUltimaFactura(response.data);
          });
      })
      .catch((error) => error.response.status === 409
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const obtenerFactura = (id) => {
    ObtenerFacturaCliente(id);
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
            {state.datosOrdenReparacion
              ? (
                <Grid item md={6}>
                  <Box>
                    <InformacionOrdenReparacion
                      ordenReparacionAFacturar={ordenReparacionAFacturar}
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
      {state.formBuscarParaEditarFacturaCliente
        ? (
          <Grid item md={2}>
            <Box>
              <BuscarPorUnInput
                label="Seleccionar factura para editar"
                textImput="referencia"
                inputLabel="referencia(id)"
                obtener={obtenerFactura}
              />
            </Box>
          </Grid>
        ) : null}
      {state.formEditarFacturaCliente
        ? (
          <>
            <Grid item md={2}>
              <EditarFacturaClienteForm
                handleSubmitEditarFacturaForm={handleSubmitEditarFacturaForm}
                ordenReparacionAFacturar={ordenReparacionAFacturar}
                disabled={disabled}
                setDisabled={setDisabled}
              />
              <ModalErrores
                openError={modal.openError}
                message={modal.message}
                handleCloseError={modal.handleCloseError}
              />
            </Grid>
            <Grid item md={10}>
              <Box>
                <TablaOrdenesReparacionNoFacturadas
                  obtenerOrdenesReparacionNoFacturadas={obtenerOrdenesReparacionNoFacturadas}
                  ordenesReparacionNoFacturadas={ordenesReeparacionNoFacturadas}
                  seleccionarOrdenReparacion={seleccionarOrdenReparacionEditar}
                />
              </Box>
            </Grid>
            {state.datosOrdenReparacion
              ? (
                <Grid item md={6}>
                  <Box>
                    <InformacionOrdenReparacion
                      ordenReparacionAFacturar={ordenReparacionAFacturar}
                    />
                  </Box>
                </Grid>
              ) : null}
          </>
        ) : null}
      {state.formBuscarParaEliminarFacturaCliente ? <p>form eliminar factura cliente</p> : null}
    </Grid>
  );
}
