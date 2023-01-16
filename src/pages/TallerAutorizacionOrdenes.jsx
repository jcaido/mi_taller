import React, { useState, createContext, useReducer } from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import AutorizacionOrdenes from '../components/autorizacion-ordenes-reparacion/AutorizacionOrdenes';
import { obtenerOrdenesReparacionAbiertas, obtenerOrdenesReparacionAbiertasPorFechaApertura, obtenerOrdenesReparacionAbiertasPorVehiculo, obtenerOrdenReparacionPorId, obtenerOrdenReparacionPorIdCompleta, obtenerVehiculosPorMatricula } from '../services/axiosService';
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
                dispatch({type: 'actualizar_lista_ordenes_reparacion_abiertas', payload: response.data});
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
                        dispatch({type:'actualizar_lista_ordenes_reparacion_abiertas', payload: response.data})
                    })
                    .then(() => {
                        buscarOrdenesReparacionAbiertasPorVehiculoDispatch();
                    })
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ObtenerOrdenReparacionPorId = (id) => {
        obtenerOrdenReparacionPorIdCompleta(id)
            .then((response) => {
                dispatch({ type: 'actualizar_lista_ordenes_reparacion_por_id', payload: response.data })
            })
            .then(() => {
                AutorizacionOrdenReparacionPdfDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
                error.response.status === 400 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ImprimirOrdenReparacionPorId = (id) => {
        obtenerOrdenReparacionPorIdCompleta(id)
            .then((response) => {
                dispatch({ type: 'actualizar_lista_ordenes_reparacion_por_id', payload: response.data })
            })
            .then(() => {
                ImprimirAutorizacionOrdenReparacionPdfDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
                error.response.status === 400 && handleOpenError(error.response.data.mensaje);
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

    const CerrarTablaOrdenesReparacionAbiertas = () => {
        dispatch({type: 'cerrar_tabla_ordenes_reparacion_abiertas', payload: false})
    }

    const CerrarAutorizacionPdf = () => {
        dispatch({ type: 'cerrar_autorizacion_pdf', payload: false})
    }

    const autorizacionOrdenReparacionInicial = {
        formNuevaOrdenReparacion: false,
        formBuscarOrdenReparacion: false,
        formEditarOrdenReparacion: false,
        formEliminarOrdenReparacion: false,
        formImprimirOrdenReparacion: false,
        tablaOrdenesReparacion: false,
        tablaOrdenesReparacionAbiertasBusquedas: false,
        editarOrdenReparacion: false,
        eliminarOrdenReparacion: false,
        imprimirOrdenReparacion: false,
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
                    tablaOrdenesReparacionAbiertasBusquedas: action.payload.tablaOrdenesReparacionAbiertasBusquedas,
                    editarOrdenReparacion: action.payload.editarOrdenReparacion,
                    eliminarOrdenReparacion: action.payload.eliminarOrdenReparacion,
                    imprimirOrdenReparacion: action.payload.imprimirOrdenReparacion
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
            case 'cerrar_tabla_ordenes_reparacion_abiertas':
                return {
                    ...state,
                    tablaOrdenesReparacionAbiertasBusquedas: action.payload
                }
            case 'cerrar_autorizacion_pdf':
                return {
                    ...state,
                    imprimirOrdenReparacion: action.payload
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
                tablaOrdenesReparacionAbiertasBusquedas: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false,
                imprimirOrdenReparacion: false
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
                tablaOrdenesReparacionAbiertasBusquedas: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false,
                imprimirOrdenReparacion: false
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
                tablaOrdenesReparacionAbiertasBusquedas: true,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false,
                imprimirOrdenReparacion: false                
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
                tablaOrdenesReparacionAbiertasBusquedas: true,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false,
                imprimirOrdenReparacion: false                 
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
                tablaOrdenesReparacionAbiertasBusquedas: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion:false,
                imprimirOrdenReparacion: false
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
                tablaOrdenesReparacionAbiertasBusquedas: false,
                editarOrdenReparacion: true,
                eliminarOrdenReparacion: false,
                imprimirOrdenReparacion: false
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
                tablaOrdenesReparacionAbiertasBusquedas: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: true,
                imprimirOrdenReparacion: false
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
                tablaOrdenesReparacionAbiertasBusquedas: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false,
                imprimirOrdenReparacion: false
            }
        })
    }

    function AutorizacionOrdenReparacionPdfDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: true,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: false,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasBusquedas: true,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false,
                imprimirOrdenReparacion: true                
            }
        })
    }

    function ImprimirAutorizacionOrdenReparacionPdfDispatch() {
        dispatch({
            type: 'ordenReparacion',
            payload: {
                formNuevaOrdenReparacion: false,
                formBuscarOrdenReparacion: false,
                formEditarOrdenReparacion: false,
                formEliminarOrdenReparacion: false,
                formImprimirOrdenReparacion: true,
                tablaOrdenesReparacion: false,
                tablaOrdenesReparacionAbiertasBusquedas: false,
                editarOrdenReparacion: false,
                eliminarOrdenReparacion: false,
                imprimirOrdenReparacion: true                 
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
                CerrarFormEliminarOrdenReparacion,
                AutorizacionOrdenReparacionPdfDispatch,
                ObtenerOrdenReparacionPorId,
                CerrarTablaOrdenesReparacionAbiertas,
                CerrarAutorizacionPdf,
                ImprimirOrdenReparacionPorId
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
