import React, { useState, createContext, useReducer } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import AutorizacionOrdenes from '../components/autorizacion-ordenes-reparacion/AutorizacionOrdenes';
import { obtenerOrdenesReparacionAbiertas, obtenerOrdenesReparacionAbiertasPorFechaApertura, obtenerOrdenesReparacionAbiertasPorVehiculo, obtenerOrdenReparacionPorId, obtenerVehiculosPorMatricula } from '../services/axiosService';
import ModalErrores from '../utils/ModalErrores';

export const AutorizacionOrdenesContext = createContext();

const TallerAutorizacionOrdenes = () => {

    const [openError, setOpenError] = useState(false);
    const [message, setMensaje] = useState('');
    const handleOpenError = (messag) => {
        setOpenError(true);
        setMensaje(messag);
    }

    const handleCloseError = () => setOpenError(false)

    const ListarOrdenesReparacionAbiertas = () => {
        obtenerOrdenesReparacionAbiertas()
            .then((response) => {
                dispatch({ type:'actualizar_lista_ordenes_reparacion_abiertas', payload: response.data});    
            })
            .catch((error) => {
                alert(`ERROR: ${error.response.data.mensaje}`);
            })
    }

    const ListarOrdenesReparacionAbiertasPorFechaApertura = (fechaApertura) => {
        obtenerOrdenesReparacionAbiertasPorFechaApertura(fechaApertura)
            .then((response) => {
                dispatch({type: 'actualizar_lista_ordenes_reparacion_abiertas_por_fecha_apertura', payload: response.data});
            })
            .then(() => {
                buscarOrdenesReparacionAbiertasPorFechaAperturaDispatch();
            })
            .catch((error) => {
                alert(`ERROR: ${error.response.data.mensaje}`);
            })
    }

    const ListarOrdenesReparacionAbiertasPorVehiculo = (matricula) => {
        obtenerVehiculosPorMatricula(matricula)
            .then((response) => {
                obtenerOrdenesReparacionAbiertasPorVehiculo(response.data.id)
                    .then((response) => {
                        dispatch({type:'actualizar_lista_ordenes_reparacion_abiertas_por_vehiculo', payload: response.data})
                    })
                    .then(() => {
                        buscarOrdenesReparacionAbiertasPorVehiculoDispatch();
                    })
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ObtenerOrdenReparacionPorIdParaEditar = (id) => {
        obtenerOrdenReparacionPorId(id)
            .then((response) => {
                dispatch({type: 'actualizar_lista_ordenes_reparacion_por_id', payload: response.data})
            })
            .then(() => {
                editarOrdenReparacionFormDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ObtenerOrdenReparacionPorIdParaEliminar = (id) => {
        obtenerOrdenReparacionPorId(id)
            .then((response) => {
                dispatch({ type: 'actualizar_lista_ordenes_reparacion_por_id', payload: response.data })
            })
            .then(() => {
                eliminarOrdenReparacionFormDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const CerrarFormEditarOrdenReparacion = () => {
        dispatch({type:'cerrar_formulario_editar_orden_reparacion', payload: false})
    }

    const CerrarFormEliminarOrdenReparacion = () => {
        dispatch({type:'cerrar_formulario_eliminar_orden_reparacion', payload: false})
    }

    const autorizacionOrdenReparacionInicial = {
        formNuevaOrdenReparacion: false,
        formBuscarOrdenReparacion: false,
        formEditarOrdenReparacion: false,
        formEliminarOrdenReparacion: false,
        formImprimirOrdenReparacion: false,
        tablaOrdenesReparacion: false,
        tablaOrdenesReparacionAbiertasPorFechaApertura: false,
        tablaOrdensReparacionAbiertasPorVehiculo: false,
        editarOrdenReparacion: false,
        eliminarOrdenReparacion: false,
        listaOrdenesReparacionAbiertas: [],
        listaOrdenesReparacionAbiertasPorFechaApertura: [],
        listaOrdenesReparacionAbiertasPorVehiculo: [],
        listaOrdenReparacionPorId: []
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
                    tablaOrdenesReparacion: action.payload.tablaOrdenesReparacion,
                    tablaOrdenesReparacionAbiertasPorFechaApertura: action.payload.tablaOrdenesReparacionAbiertasPorFechaApertura,
                    tablaOrdensReparacionAbiertasPorVehiculo: action.payload.tablaOrdensReparacionAbiertasPorVehiculo,
                    editarOrdenReparacion: action.payload.editarOrdenReparacion,
                    eliminarOrdenReparacion: action.payload.eliminarOrdenReparacion
                }
            case 'actualizar_lista_ordenes_reparacion_abiertas':
                return {
                    ...state,
                    listaOrdenesReparacionAbiertas: action.payload
                }
            case 'actualizar_lista_ordenes_reparacion_abiertas_por_fecha_apertura':
                return {
                    ...state,
                    listaOrdenesReparacionAbiertasPorFechaApertura: action.payload
                }
            case 'actualizar_lista_ordenes_reparacion_abiertas_por_vehiculo':
                return {
                    ...state,
                    listaOrdenesReparacionAbiertasPorVehiculo: action.payload
                }
            case 'actualizar_lista_ordenes_reparacion_por_id':
                return {
                    ...state,
                    listaOrdenReparacionPorId: action.payload
                }
            case'cerrar_formulario_editar_orden_reparacion':
                return {
                    ...state,
                    editarOrdenReparacion: action.payload
                }
            case 'cerrar_formulario_eliminar_orden_reparacion':
                return {
                    ...state,
                    eliminarOrdenReparacion: action.payload
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
                tablaOrdenesReparacion: true,
                tablaOrdenesReparacionAbiertasPorFechaApertura: false,
                tablaOrdensReparacionAbiertasPorVehiculo: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false
            }
        })
    }

    function buscarOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: true,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasPorFechaApertura: false,
                tablaOrdensReparacionAbiertasPorVehiculo: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false
            }
        })
    }

    function buscarOrdenesReparacionAbiertasPorFechaAperturaDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: true,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasPorFechaApertura: true,
                tablaOrdensReparacionAbiertasPorVehiculo: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false                
            }
        })
    }

    function buscarOrdenesReparacionAbiertasPorVehiculoDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: true,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasPorFechaApertura: false,
                tablaOrdensReparacionAbiertasPorVehiculo: true,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false                 
            }
        })
    }

    function buscarOrdenReparacionParaEditarDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: true,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasPorFechaApertura: false,
                tablaOrdensReparacionAbiertasPorVehiculo: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion:false
            }
        })        
    }

    function editarOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: true,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasPorFechaApertura: false,
                tablaOrdensReparacionAbiertasPorVehiculo: false,
                editarOrdenReparacion: true,
                eliminarOrdenReparacion: false
            }
        })
    }

    function eliminarOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: true,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasPorFechaApertura: false,
                tablaOrdensReparacionAbiertasPorVehiculo: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: true
            }
        })
    }

    function imprimirOrdenReparacionFormDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: true,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasPorFechaApertura: false,
                tablaOrdensReparacionAbiertasPorVehiculo: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false
            }
        })
    }


    return (
        <AutorizacionOrdenesContext.Provider value = 
            {{
                state,
                nuevaOrdenReparacionFormDispatch,
                buscarOrdenReparacionFormDispatch,
                editarOrdenReparacionFormDispatch,
                eliminarOrdenReparacionFormDispatch,
                imprimirOrdenReparacionFormDispatch,
                ListarOrdenesReparacionAbiertas,
                ListarOrdenesReparacionAbiertasPorFechaApertura,
                buscarOrdenesReparacionAbiertasPorFechaAperturaDispatch,
                ListarOrdenesReparacionAbiertasPorVehiculo,
                ObtenerOrdenReparacionPorIdParaEditar,
                buscarOrdenReparacionParaEditarDispatch,
                CerrarFormEditarOrdenReparacion,
                ObtenerOrdenReparacionPorIdParaEliminar,
                CerrarFormEliminarOrdenReparacion
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
                <ModalErrores openError={openError} message={message} handleCloseError={handleCloseError}></ModalErrores>
            </Grid>
        </AutorizacionOrdenesContext.Provider>

    )
}

export default TallerAutorizacionOrdenes
