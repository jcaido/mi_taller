import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonAutOrdenes from './NavigationButtonAutOrdenes';
import { AutorizacionOrdenesContext } from '../../pages/TallerAutorizacionOrdenes';
import NuevaOrdenReparacionForm from './forms/NuevaOrdenReparacionForm';
import TablaOrdenesReparacion from './TablaOrdenesReparacion';
import BuscarOrdenReparacionForm from './forms/BuscarOrdenReparacionForm';
import TablaOrdenesReparacionBusqueda from './TablaOrdenesReparacionBusqueda';

const AutorizacionOrdenes = () => {

    const { 
        state, 
        nuevaOrdenReparacionFormDispatch, 
        buscarOrdenReparacionFormDispatch,
        editarOrdenReparacionFormDispatch,
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
                        editar = { editarOrdenReparacionFormDispatch }
                        eliminar = { eliminarOrdenReparacionFormDispatch }
                        imprimir = { imprimirOrdenReparacionFormDispatch }
                    />
                </Box>
            </Grid>
            <Grid item md = {4}>
                <Box>
                    { state.formNuevaOrdenReparacion && <NuevaOrdenReparacionForm></NuevaOrdenReparacionForm> }
                    { state.formBuscarOrdenReparacion && <BuscarOrdenReparacionForm></BuscarOrdenReparacionForm> }
                    { state.formEditarOrdenReparacion && <p>formulario editar orden de reparacion</p> }
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
            </Grid>
        </Grid>
    )
}

export default AutorizacionOrdenes
