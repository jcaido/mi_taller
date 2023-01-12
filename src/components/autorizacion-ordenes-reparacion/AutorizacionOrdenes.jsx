import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonAutOrdenes from './NavigationButtonAutOrdenes';
import { AutorizacionOrdenesContext } from '../../pages/TallerAutorizacionOrdenes';
import NuevaOrdenReparacionForm from './forms/NuevaOrdenReparacionForm';
import TablaOrdenesReparacion from './TablaOrdenesReparacion';
import BuscarOrdenReparacionForm from './forms/BuscarOrdenReparacionForm';
import TablaOrdenesReparacionBusqueda from './TablaOrdenesReparacionBusqueda';
import BuscarOrdenReparacionPorIdForm from './forms/BuscarOrdenReparacionPorIdForm';
import EditarOrdenReparacionForm from './forms/EditarOrdenReparacionForm';
import EliminarOrdenReparacionForm from './forms/EliminarOrdenReparacionForm';

const AutorizacionOrdenes = () => {

    const { 
        state, 
        nuevaOrdenReparacionFormDispatch, 
        buscarOrdenReparacionFormDispatch,
        buscarOrdenReparacionParaEditarDispatch,
        eliminarOrdenReparacionFormDispatch,
        imprimirOrdenReparacionFormDispatch,
        ObtenerOrdenReparacionPorIdParaEditar,
        CerrarFormEditarOrdenReparacion,
        ObtenerOrdenReparacionPorIdParaEliminar,
        CerrarFormEliminarOrdenReparacion 
    } = useContext(AutorizacionOrdenesContext);

    return (
        <Grid container>
            <Grid item md = {12}>
                <Box mt = {1}>
                    <NavigationButtonAutOrdenes
                        nueva = { nuevaOrdenReparacionFormDispatch }
                        buscar = { buscarOrdenReparacionFormDispatch }
                        buscarParaEditar = { buscarOrdenReparacionParaEditarDispatch }
                        eliminar = { eliminarOrdenReparacionFormDispatch }
                        imprimir = { imprimirOrdenReparacionFormDispatch }
                    />
                </Box>
            </Grid>
            <Grid item md = {4}>
                <Box>
                    { state.formNuevaOrdenReparacion && <NuevaOrdenReparacionForm></NuevaOrdenReparacionForm> }
                    { state.formBuscarOrdenReparacion && <BuscarOrdenReparacionForm></BuscarOrdenReparacionForm> }
                    { state.formEditarOrdenReparacion && 
                        <BuscarOrdenReparacionPorIdForm
                            label = 'Buscar orden de reparacion'
                            obtener = { ObtenerOrdenReparacionPorIdParaEditar }
                            cerrar = { CerrarFormEditarOrdenReparacion }
                        />
                    }
                    { state.formEliminarOrdenReparacion &&
                        <BuscarOrdenReparacionPorIdForm
                            label = 'Buscar orden de reparacion'
                            obtener = { ObtenerOrdenReparacionPorIdParaEliminar }
                            cerrar = {CerrarFormEliminarOrdenReparacion}
                        />
                    }
                    { state.formImprimirOrdenReparacion && <p>formulario imprimir orden de reparacion</p> }
                </Box>
            </Grid>
            <Grid item md = {8}>
                <Box>
                    { state.tablaOrdenesReparacion && <TablaOrdenesReparacion></TablaOrdenesReparacion> }
                    { state.tablaOrdenesReparacionAbiertasPorFechaApertura && <TablaOrdenesReparacionBusqueda lista = { state.listaOrdenesReparacionAbiertasPorFechaApertura }></TablaOrdenesReparacionBusqueda> }
                    { state.tablaOrdensReparacionAbiertasPorVehiculo && <TablaOrdenesReparacionBusqueda lista = { state.listaOrdenesReparacionAbiertasPorVehiculo }></TablaOrdenesReparacionBusqueda> }
                </Box>
                <Box>
                    { state.editarOrdenReparacion && <EditarOrdenReparacionForm></EditarOrdenReparacionForm> }
                    { state.eliminarOrdenReparacion && <EliminarOrdenReparacionForm></EliminarOrdenReparacionForm> }
                </Box>
            </Grid>
        </Grid>
    )
}

export default AutorizacionOrdenes
