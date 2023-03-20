import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import NavigationButtonAutOrdenes from './NavigationButtonAutOrdenes';
import { AutorizacionOrdenesContext } from '../../pages/TallerAutorizacionOrdenes';
import NuevaOrdenReparacionForm from './forms/NuevaOrdenReparacionForm';
import TablaOrdenesReparacion from './TablaOrdenesReparacion';
import BuscarOrdenReparacionForm from './forms/BuscarOrdenReparacionForm';
import TablaOrdenesReparacionBusqueda from './TablaOrdenesReparacionBusqueda';
import EditarOrdenReparacionForm from './forms/EditarOrdenReparacionForm';
import EliminarOrdenReparacionForm from './forms/EliminarOrdenReparacionForm';
import OrdenReparacionPDF from './OrdenReparacionPDF';
import BuscarPorUnInput from '../BuscarPorUnInput';

function AutorizacionOrdenes() {
  const {
    state,
    nuevaOrdenReparacionFormDispatch,
    buscarOrdenReparacionFormDispatch,
    buscarOrdenReparacionParaEditarDispatch,
    buscarOrdenReparacionParaEliminarDispatch,
    imprimirOrdenReparacionFormDispatch,
    ObtenerOrdenReparacionPorIdParaEditar,
    CerrarFormEditarOrdenReparacion,
    ObtenerOrdenReparacionPorIdParaEliminar,
    CerrarFormEliminarOrdenReparacion,
    ObtenerOrdenReparacionPorId,
    ImprimirOrdenReparacionPorId,
    CerrarAutorizacionPdf,
  } = useContext(AutorizacionOrdenesContext);

  const handleOnSelectionModelChange = (id) => {
    ObtenerOrdenReparacionPorId(id);
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Box mt={1}>
          <NavigationButtonAutOrdenes
            nueva={nuevaOrdenReparacionFormDispatch}
            buscar={buscarOrdenReparacionFormDispatch}
            buscarParaEditar={buscarOrdenReparacionParaEditarDispatch}
            buscarParaEliminar={buscarOrdenReparacionParaEliminarDispatch}
            imprimir={imprimirOrdenReparacionFormDispatch}
          />
        </Box>
      </Grid>
      <Grid item md={4}>
        <Box>
          { state.formNuevaOrdenReparacion && <NuevaOrdenReparacionForm /> }
          { state.formBuscarOrdenReparacion && <BuscarOrdenReparacionForm /> }
          { state.formEditarOrdenReparacion
                        && (
                        <BuscarPorUnInput
                          label="Buscar orden de reparacion"
                          textInput="id"
                          inputLabel="referencia(id)"
                          obtener={ObtenerOrdenReparacionPorIdParaEditar}
                          cerrar={CerrarFormEditarOrdenReparacion}
                        />
                        )}
          { state.formEliminarOrdenReparacion
                        && (
                        <BuscarPorUnInput
                          label="Buscar orden de reparacion"
                          textInput="id"
                          inputLabel="referencia(id)"
                          obtener={ObtenerOrdenReparacionPorIdParaEliminar}
                          cerrar={CerrarFormEliminarOrdenReparacion}
                        />
                        )}
          { state.formImprimirOrdenReparacion
                        && (
                        <BuscarPorUnInput
                          label="Buscar orden de reparacion"
                          textInput="id"
                          inputLabel="referencia(id)"
                          obtener={ImprimirOrdenReparacionPorId}
                          cerrar={CerrarAutorizacionPdf}
                        />
                        )}
        </Box>
      </Grid>
      <Grid item md={8}>
        <Box>
          { state.tablaOrdenesReparacion && <TablaOrdenesReparacion /> }
          {
            state.tablaOrdenesReparacionAbiertasBusquedas
              && (
                <TablaOrdenesReparacionBusqueda
                  lista={state.listaOrdenesReparacionAbiertas}
                  tablaOnChange={handleOnSelectionModelChange}
                />
              )
          }
        </Box>
        <Box>
          { state.editarOrdenReparacion && <EditarOrdenReparacionForm /> }
          { state.eliminarOrdenReparacion && <EliminarOrdenReparacionForm /> }
        </Box>
      </Grid>
      <Grid item md={12}>
        <Box>
          { state.imprimirOrdenReparacion
                        && (
                        <PDFViewer style={{ width: '90%', height: '90vh', marginLeft: '80px' }}>
                          <OrdenReparacionPDF orden={state.listaOrdenReparacionPorId} />
                        </PDFViewer>
                        )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default AutorizacionOrdenes;
