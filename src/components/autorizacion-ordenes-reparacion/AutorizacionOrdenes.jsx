import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonAutOrdenes from './NavigationButtonAutOrdenes';
import { AutorizacionOrdenesContext } from '../../pages/TallerAutorizacionOrdenes';
import NuevaOrdenReparacionForm from './forms/NuevaOrdenReparacionForm';
import TablaOrdenesReparacion from './TablaOrdenesReparacion';
import BuscarOrdenReparacionForm from './forms/BuscarOrdenReparacionForm';
import TablaOrdenesReparacionBusqueda from './TablaOrdenesReparacionBusqueda';
import BuscarOrdenReparacionParaEditarForm from './forms/BuscarOrdenReparacionParaEditarForm';
import EditarOrdenReparacionForm from './forms/EditarOrdenReparacionForm';

const AutorizacionOrdenes = () => {

    const { 
        state, 
        nuevaOrdenReparacionFormDispatch, 
        buscarOrdenReparacionFormDispatch,
        buscarOrdenReparacionParaEditarDispatch,
        eliminarOrdenReparacionFormDispatch,
        imprimirOrdenReparacionFormDispatch 
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
                    { state.formEditarOrdenReparacion && <BuscarOrdenReparacionParaEditarForm></BuscarOrdenReparacionParaEditarForm> }
                    { state.formEliminarOrdenReparacion && <p>formulario eliminar orden de reparacion</p> }
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
                </Box>
            </Grid>
        </Grid>
    )
}

export default AutorizacionOrdenes
