import React, { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FacturacionProveedoresContext } from '../../pages/FacturacionProveedores';
import NavigationButtonFacturacionProveedores from './NavigationButtonFacturacionProveedores';
import NuevaFacturaProveedorForm from './forms/NuevaFacturaProveedorForm';
import TablaAlbaranesNoFacturados from './TablaAlbaranesNoFacturados';
import TablaAlbaranesAsignados from './TablaAlbaranesAsignados';
import {
  facturarAlbaranProveedor,
  noFacturarAlbaranProveedor,
  obtenerAlbaranesAsignadosAFactura,
  obtenerAlbaranesNoFacturadosProveedor,
} from '../../services/axiosService';
import useModal from '../../hooks/useModal';

export default function FacturasProveedor() {
  const
    {
      state,
      crearFacturaProveedorFormDispatch,
      editarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
    } = useContext(FacturacionProveedoresContext);

  const [albaranesNoFacturados, setAlbaranesNoFacturados] = useState([]);
  const [albaranesAsignados, setAlbaranesAsignados] = useState([]);

  const asignarAlbaranesNoFacturados = (albaranes) => {
    setAlbaranesNoFacturados(albaranes);
  };

  const obtenerAlbaranesAsignados = (albaranes) => {
    setAlbaranesAsignados(albaranes);
  };

  const modal = useModal();

  const totalAlbaran = (idAlbaran, albaranes) => {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const albaran of albaranes) {
      if (albaran.id === idAlbaran) {
        // eslint-disable-next-line no-restricted-syntax
        for (const entrada of albaran.entradasPiezas) {
          total += entrada.cantidad * entrada.precioEntrada;
        }
      }
    }
    return total;
  };

  const baseImponible = (albaranes) => {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const albaran of albaranes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const entrada of albaran.entradasPiezas) {
        total += entrada.cantidad * entrada.precioEntrada;
      }
    }
    return total;
  };

  const handleClickFacturarAlbaran = (albaran, factura) => {
    facturarAlbaranProveedor(albaran, factura)
      .then(() => {
        obtenerAlbaranesNoFacturadosProveedor(state.idProveedor)
          .then((response) => {
            asignarAlbaranesNoFacturados(response.data);
            obtenerAlbaranesAsignadosAFactura(state.idFacturaProveedor)
              .then((res) => {
                obtenerAlbaranesAsignados(res.data);
              })
              .catch((error) => {
                modal.handleOpenError(`something went wrong: ${error}`);
              });
          })
          .catch((error) => {
            modal.handleOpenError(`something went wrong: ${error}`);
          });
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

  const handleClickNoFacturarAlbaranFacturado = (albaran) => {
    noFacturarAlbaranProveedor(albaran)
      .then(() => {
        obtenerAlbaranesNoFacturadosProveedor(state.idProveedor)
          .then((response) => {
            asignarAlbaranesNoFacturados(response.data);
            obtenerAlbaranesAsignadosAFactura(state.idFacturaProveedor)
              .then((res) => {
                obtenerAlbaranesAsignados(res.data);
              })
              .catch((error) => {
                modal.handleOpenError(`something went wrong: ${error}`);
              });
          })
          .catch((error) => {
            modal.handleOpenError(`something went wrong: ${error}`);
          });
      })
      .catch((error) => error.response.status === 404
      && modal.handleOpenError(error.response.data.mensaje));
  };

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
            {state.tablasAlbaranes
              ? (
                <>
                  <Grid item md={5}>
                    <TablaAlbaranesNoFacturados
                      albaranes={albaranesNoFacturados}
                      asignarAlbaranes={asignarAlbaranesNoFacturados}
                      totalAlbaran={totalAlbaran}
                      handleClickFacturarAlbaran={handleClickFacturarAlbaran}
                    />
                  </Grid>
                  <Grid item md={5}>
                    <TablaAlbaranesAsignados
                      albaranes={albaranesAsignados}
                      obtenerAlbaranesAsignados={obtenerAlbaranesAsignados}
                      totalAlbaran={totalAlbaran}
                      handleClickNoFacturarAlbaranFacturado={handleClickNoFacturarAlbaranFacturado}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Card sx={{
                      minWidth: 200, height: '180px', marginLeft: 5, marginRight: 5,
                    }}
                    >
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          { 'Referencia (id): ' }
                          { state.idFacturaProveedor }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'Fecha Factura: ' }
                          { state.fechaFacturaProveedor }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'Número Factura: ' }
                          { state.numeroFacturaProveedor }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'Proveedor: ' }
                          { state.nombreProveedor }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'CIF / DNI: ' }
                          { state.cifNifProveedor }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'Domicilio: ' }
                          { state.domicilioProveedor }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'Código Postal: ' }
                          { state.codigoPostalProveedor }
                          { ' .- ' }
                          { state.localidadProveedor }
                          { ' .- ' }
                          { state.provinciaProveedor }
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item md={6}>
                    <Card sx={{
                      minWidth: 200, height: '180px', marginLeft: 5, marginRight: 5,
                    }}
                    >
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          { 'BASE IMPONIBLE: ' }
                          { baseImponible(albaranesAsignados).toLocaleString('en') }
                          { ' €'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'TIPO IVA: ' }
                          { state.tipoIVAFacturaProveedor }
                          { ' %'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'CUOTA IVA: ' }
                          { ((baseImponible(albaranesAsignados) * state.tipoIVAFacturaProveedor) / 100).toLocaleString('en') }
                          { ' €'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          { 'TOTAL FACTURA: ' }
                          { (baseImponible(albaranesAsignados) + ((baseImponible(albaranesAsignados) * state.tipoIVAFacturaProveedor) / 100)).toLocaleString('en') }
                          { ' €'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              ) : null }
          </>
        ) : null}
      {state.formEditarFacturaProveedor ? <p>formulario editar factura</p> : null}
      {state.formEliminarFacturaProveedor ? <p>formulario eliminar factura</p> : null}
    </Grid>
  );
}
