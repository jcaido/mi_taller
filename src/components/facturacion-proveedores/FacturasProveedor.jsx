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

  const listaAlbaranesAsignados = () => {
    obtenerAlbaranesAsignadosAFactura(state.idFacturaProveedor)
      .then((response) => {
        setAlbaranesAsignados(response.data);
      });
  };

  const listaEdicionAlbaranesAsignados = () => {
    obtenerAlbaranesAsignadosAFactura(state.facturaProveedor.id)
      .then((response) => {
        setAlbaranesAsignados(response.data);
      });
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

  const handleClickFacturarAlbaran = (albaran) => {
    facturarAlbaranProveedor(albaran, state.idFacturaProveedor)
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

  const handleClickEdicionFacturarAlbaran = (albaran) => {
    facturarAlbaranProveedor(albaran, state.facturaProveedor.id)
      .then(() => {
        obtenerAlbaranesNoFacturadosProveedor(state.facturaProveedor.proveedor.id)
          .then((response) => {
            asignarAlbaranesNoFacturados(response.data);
            obtenerAlbaranesAsignadosAFactura(state.facturaProveedor.id)
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

  const handleClickEdicionNoFacturarAlbaranFacturado = (albaran) => {
    noFacturarAlbaranProveedor(albaran)
      .then(() => {
        obtenerAlbaranesNoFacturadosProveedor(state.facturaProveedor.proveedor.id)
          .then((response) => {
            asignarAlbaranesNoFacturados(response.data);
            obtenerAlbaranesAsignadosAFactura(state.facturaProveedor.id)
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
    obtenerAlbaranesNoFacturadosProveedor(state.facturaProveedor.proveedor.id)
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
                      obtenerAlbaranesAsignados={listaAlbaranesAsignados}
                      totalAlbaran={totalAlbaran}
                      handleClickNoFacturarAlbaranFacturado={handleClickNoFacturarAlbaranFacturado}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <DatosFactura
                      idFactura={state.idFacturaProveedor}
                      fechaFactura={state.fechaFacturaProveedor}
                      numeroFactura={state.numeroFacturaProveedor}
                      nombreProveedor={state.nombreProveedor}
                      cifNifProveedor={state.cifNifProveedor}
                      domicilioProveedor={state.domicilioProveedor}
                      codigoPostalProveedor={state.codigoPostalProveedor}
                      localidadProveedor={state.localidadProveedor}
                      provinciaProveedor={state.provinciaProveedor}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TotalesFactura
                      baseImponible={baseImponible}
                      albaranesAsignados={albaranesAsignados}
                      tipoIva={state.tipoIVAFacturaProveedor}
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
                <EditarFacturaProveedorForm
                  asignarAlbaranesNoFacturados={asignarAlbaranesNoFacturados}
                />
              </Box>
            </Grid>
            <Grid item md={5}>
              <TablaAlbaranesNoFacturados
                albaranes={albaranesNoFacturados}
                obtenerAlbaranes={obtenerAlbaranesNoFacturadosParaEditar}
                totalAlbaran={totalAlbaran}
                handleClickFacturarAlbaran={handleClickEdicionFacturarAlbaran}
              />
            </Grid>
            <Grid item md={5}>
              <TablaAlbaranesAsignados
                albaranes={albaranesAsignados}
                obtenerAlbaranesAsignados={listaEdicionAlbaranesAsignados}
                totalAlbaran={totalAlbaran}
                handleClickNoFacturarAlbaranFacturado={handleClickEdicionNoFacturarAlbaranFacturado}
              />
            </Grid>
            <Grid item md={6}>
              <DatosFactura
                idFactura={state.facturaProveedor.id}
                fechaFactura={state.facturaProveedor.fechaFactura}
                numeroFactura={state.facturaProveedor.numeroFactura}
                nombreProveedor={state.facturaProveedor.proveedor.nombre}
                cifNifProveedor={state.facturaProveedor.proveedor.dniCif}
                domicilioProveedor={state.facturaProveedor.proveedor.domicilio}
                codigoPostalProveedor={state.facturaProveedor.proveedor.codigoPostal.codigo}
                localidadProveedor={state.facturaProveedor.proveedor.codigoPostal.localidad}
                provinciaProveedor={state.facturaProveedor.proveedor.codigoPostal.provincia}
              />
            </Grid>
            <Grid item md={6}>
              <TotalesFactura
                baseImponible={baseImponible}
                albaranesAsignados={albaranesAsignados}
                tipoIva={state.facturaProveedor.tipoIVA}
              />
            </Grid>
          </>
        ) : null}
      {state.formEliminarFacturaProveedor ? <p>formulario eliminar factura</p> : null}
    </Grid>
  );
}
