import React, { createContext, useReducer } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import AutorizacionOrdenes from '../components/autorizacion-ordenes-reparacion/AutorizacionOrdenes';
import { obtenerOrdenesReparacionAbiertas } from '../services/axiosService';

export const AutorizacionOrdenesContext = createContext();

const TallerAutorizacionOrdenes = () => {

    const ListarOrdenesReparacionAbiertas = () => {
        obtenerOrdenesReparacionAbiertas()
            .then((response) => {
                dispatch({ type:'actualizar_lista_ordenes_reparacion_abiertas', payload: response.data})
                
            })
            .catch((error) => {
                alert(`ERROR: ${error.response.data.mensaje}`);
            })
    }

    const autorizacionOrdenReparacionInicial = {
        formNuevaOrdenReparacion: false,
        formBuscarOrdenReparacion: false,
        formEditarOrdenReparacion: false,
        formEliminarOrdenReparacion: false,
        formImprimirOrdenReparacion: false,
        tablaOrdenesReparacion: false,
        listaOrdenesReparacionAbiertas: []
    }

    const autorizacionOrdenesReducer = (state, action) => {
        switch (action.type) {
            case 'ordenReparacion':
                return {
                    ...state,
                    formNuevaOrdenReparacion: action.payload.formNuevaOrdenReparacion,
                    formBuscarOrdenReparacion: action.payload.formBuscarOrdenReparacion,
                    formEditarOrdenReparacion: action.payload.formEditarOrdenReparacion,
                    formEliminarOrdenReparacion: action.payload.formEliminarOrdenReparacion,
                    formImprimirOrdenReparacion: action.payload.formImprimirOrdenReparacion,
                    tablaOrdenesReparacion: action.payload.tablaOrdenesReparacion
                }
            case 'actualizar_lista_ordenes_reparacion_abiertas':
                return {
                    ...state,
                    listaOrdenesReparacionAbiertas: action.payload
                }
            default:
                return state;
        }
    }
    
    const [state, dispatch] = useReducer(autorizacionOrdenesReducer, autorizacionOrdenReparacionInicial);

    function nuevaOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: true,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: true
            }
        })
    }

    function BuscarOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: true,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false
            }
        })
    }

    function EditarOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: true,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false
            }
        })
    }

    function EliminarOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: true,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false
            }
        })
    }

    function ImprimirOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: true,
                tablaOrdenesReparacion: false
            }
        })
    }


    return (
        <AutorizacionOrdenesContext.Provider value = 
            {{
                state,
                nuevaOrdenReparacionFormDispatch,
                BuscarOrdenReparacionFormDispatch,
                EditarOrdenReparacionFormDispatch,
                EliminarOrdenReparacionFormDispatch,
                ImprimirOrdenReparacionFormDispatch,
                ListarOrdenesReparacionAbiertas
            }}
        >
            <Grid container>
                <Grid item xs = {12}>
                    <Box sx={{textAlign: 'center', mt: 1}}>
                        <Typography variant="h7" gutterBottom>AUTORIZACION ORDENES DE REPARACION</Typography>
                    </Box>
                    <Box>
                        <AutorizacionOrdenes></AutorizacionOrdenes>
                    </Box>
                </Grid>
            </Grid>
        </AutorizacionOrdenesContext.Provider>

    )
}

export default TallerAutorizacionOrdenes
