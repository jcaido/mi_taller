import React, { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';
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
import DatosFactura from './DatosFactura';
import TotalesFactura from './TotalesFactura';
import BuscarPorUnInput from '../BuscarPorUnInput';
import EditarFacturaProveedorForm from './forms/EditarFacturaProveedorForm';

export default function FacturasProveedor() {
  const
    {
      state,
      crearFacturaProveedorFormDispatch,
      buscarParaEditarFacturaProveedorFormDispatch,
      eliminarFacturaProveedorFormDispatch,
      ObtenerFacturaProveedor,
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

  const obtenerFactura = (id) => {
    ObtenerFacturaProveedor(id);
  };

  const obtenerAlbaranesNoFacturados = () => {
    obtenerAlbaranesNoFacturadosProveedor(state.idProveedor)
      .then((response) => {
        asignarAlbaranesNoFacturados(response.data);
      })
      .catch(() => {
        alert('something went wrong');
      });
  };

  const obtenerAlbaranesNoFacturadosParaEditar = () => {
    obtenerAlbaranesNoFacturadosProveedor(state.facturaProveedor.id)
      .then((response) => {
        asignarAlbaranesNoFacturados(response.data);
      })
      .catch(() => {
        alert('something went wrong');
      });
  };

  return (
    <Grid container rowSpacing={1}>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonFacturacionProveedores
            crearFactura={crearFacturaProveedorFormDispatch}
            editarFactura={buscarParaEditarFacturaProveedorFormDispatch}
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
                      obtenerAlbaranes={obtenerAlbaranesNoFacturados}
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
                    <DatosFactura />
                  </Grid>
                  <Grid item md={6}>
                    <TotalesFactura
                      baseImponible={baseImponible}
                      albaranesAsignados={albaranesAsignados}
                    />
                  </Grid>
                </>
              ) : null }
          </>
        ) : null}
      {state.formBuscarParaEditarFacturaProveedor
        ? (
          <BuscarPorUnInput
            label="Seleccionar factura"
            textImput="referencia"
            inputLabel="referencia(id)"
            obtener={obtenerFactura}
          />
        ) : null}
      {state.formEditarFacturaProveedor
        ? (
          <>
            <Grid item md={2}>
              <Box>
                <EditarFacturaProveedorForm />
              </Box>
            </Grid>
            <Grid item md={5}>
              <TablaAlbaranesNoFacturados
                albaranes={albaranesNoFacturados}
                obtenerAlbaranes={obtenerAlbaranesNoFacturadosParaEditar}
                totalAlbaran={totalAlbaran}
                handleClickFacturarAlbaran={handleClickFacturarAlbaran}
              />
            </Grid>
            <Grid item md={5}>
              <Box>
                Tabla albaranes asignados
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                Datos factura
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                Totales factura
              </Box>
            </Grid>
          </>
        ) : null}
      {state.formEliminarFacturaProveedor ? <p>formulario eliminar factura</p> : null}
    </Grid>
  );
}
