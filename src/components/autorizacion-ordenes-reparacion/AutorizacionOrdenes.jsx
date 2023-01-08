import React, { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import NavigationButtonAutOrdenes from './NavigationButtonAutOrdenes';
import { AutorizacionOrdenesContext } from '../../pages/TallerAutorizacionOrdenes';
import NuevaOrdenReparacionForm from './forms/NuevaOrdenReparacionForm';
import TablaOrdenesReparacion from './TablaOrdenesReparacion';

const AutorizacionOrdenes = () => {

    const { 
        state, 
        nuevaOrdenReparacionFormDispatch, 
        BuscarOrdenReparacionFormDispatch,
        EditarOrdenReparacionFormDispatch,
        EliminarOrdenReparacionFormDispatch,
        ImprimirOrdenReparacionFormDispatch 
    } = useContext(AutorizacionOrdenesContext);

    return (
        <Grid container>
            <Grid item md = {12}>
                <Box mt = {1}>
                    <NavigationButtonAutOrdenes
                        nueva = { nuevaOrdenReparacionFormDispatch }
                        buscar = { BuscarOrdenReparacionFormDispatch }
                        editar = { EditarOrdenReparacionFormDispatch }
                        eliminar = { EliminarOrdenReparacionFormDispatch }
                        imprimir = { ImprimirOrdenReparacionFormDispatch }
                    />
                </Box>
            </Grid>
            <Grid item md = {4}>
                <Box>
                    { state.formNuevaOrdenReparacion && <NuevaOrdenReparacionForm></NuevaOrdenReparacionForm> }
                    { state.formBuscarOrdenReparacion && <p>formulario buscar orden de reparacion</p> }
                    { state.formEditarOrdenReparacion && <p>formulario editar orden de reparacion</p> }
                    { state.formEliminarOrdenReparacion && <p>formulario eliminar orden de reparacion</p> }
                    { state.formImprimirOrdenReparacion && <p>formulario imprimir orden de reparacion</p> }
                </Box>
            </Grid>
            <Grid item md = {8}>
                <Box>
                    { state.tablaOrdenesReparacion && <TablaOrdenesReparacion></TablaOrdenesReparacion> }
                </Box>
            </Grid>
        </Grid>
    )
}

export default AutorizacionOrdenes
