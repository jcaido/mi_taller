import { useReducer, createContext, useState } from 'react';
import NavBarDatosGenerales from '../components/NavBarDatosGenerales';
import { Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import CodigosPostales from '../components/codigos-postales/CodigosPostales';
import Propietarios from '../components/propietarios/Propietarios';
import Vehiculos from '../components/vehiculos/Vehiculos';
import { obtenerCodigoPostalPorCodigo, obtenerCodigosPostales, obtenerCodigosPostalesPorLocalidad, obtenerCodigosPostalesPorProvincia } from '../components/codigos-postales/axiosService';
import ModalErrores from '../utils/ModalErrores';

export const DatosGeneralesFormContext = createContext();

const DatosGenerales = () => {

    const [openError, setOpenError] = useState(false);
    const [message, setMensaje] = useState('');
    const handleOpenError = (messag) => {
        setOpenError(true);
        setMensaje(messag);
    }

    const handleCloseError = () => setOpenError(false)

    const ListarCodigosPostales = () => {
        obtenerCodigosPostales()
            .then((response) => {
                dispatch({type: 'actualizar_lista_codigos_postales', payload: response.data})
            })
            .catch((error) => {
                alert(`ERROR: ${error.response.data.mensaje}`);
            })
    }

    const ListarCodigosPostalesPorCodigo = (codigo) => {
        obtenerCodigoPostalPorCodigo(codigo)
            .then((response) => {
                dispatch({type: 'actualizar_lista_codigos_postales_por_codigo', payload: response.data})
            })
            .then(() => {
                buscarCodigoPostalPorCodigoDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ObtenerCodigoPostalPorCodigoParaEditar = (codigo) => {
        obtenerCodigoPostalPorCodigo(codigo)
            .then((response) => {
                dispatch({type: 'actualizar_lista_codigos_postales_por_codigo', payload: response.data})
            })
            .then(() =>{
                editarCodigoPostalFormDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ObtenerCodigoPostalPorCodigoParaEliminar = (codigo)=> {
        obtenerCodigoPostalPorCodigo(codigo)
            .then((response) => {
                dispatch({type: 'actualizar_lista_codigos_postales_por_codigo', payload: response.data})
            })
            .then(() => {
                eliminarCodigoPostalFormDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje)
            })
    }

    const ListarCodigosPostalesPorLocalidad = (localidad) => {
        obtenerCodigosPostalesPorLocalidad(localidad)
            .then((response) => {
                dispatch({type: 'actualizar_lista_codigos_postales_por_localidad', payload: response.data})
            })
            .then(() => {
                buscarCodigoPostalPorLocalidadDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ListarCodigosPostalesPorProvincia = (provincia) => {
        obtenerCodigosPostalesPorProvincia(provincia)
            .then((response) => {
                dispatch({type: 'actualizar_lista_codigos_postales_por_provincia', payload: response.data})
            })
            .then(() => {
                buscarCodigosPostalesPorProvinciaDispatch();
            })
            .catch((error) => {
                alert(`something went wrong: ${error}`)
            })
    }

    const CerrarFormEditarCodigoPostal = () => {
        dispatch({type: 'cerrar_formulario_editar_codigo_postal', payload: false})
    }

    const DatosGeneralesFormInicial = {
        formNuevoVehiculo: false,
        formBuscarVehiculo: false,
        formEditarVehiculo: false,
        formEliminarVehiculo: false,
        formNuevoPropietario: false,
        formBuscarPropietario: false,
        formEditarPropietario: false,
        formEliminarPropietario: false,
        formNuevoCodigoPostal: false,
        formBuscarCodigoPostal: false,
        formEditarCodigoPostal: false,
        formEliminarCodigoPostal: false,
        tablaCodigosPostales: false,
        codigoPostalPorCodigo: false,
        codigoPostalPorLocalidad: false,
        codigoPostalPorProvincia: false,
        editarCodigoPostal: false,
        eliminarCodigoPostal: false,
        listaCodigosPostales: [],
        listaCodigosPostalesPorCodigo: [],
        listaCodigosPostalesPorLocalidad: [],
        listaCodigosPostalesPorProvincia:[]
    }

    const DatosGeneralesFormReducer = (state, action) => {
        switch (action.type) {
            case 'vehiculo':
                return {
                    ...state,
                    formNuevoVehiculo: action.payload.formNuevoVehiculo,
                    formBuscarVehiculo: action.payload.formBuscarVehiculo,
                    formEditarVehiculo: action.payload.formEditarVehiculo,
                    formEliminarVehiculo: action.payload.formEliminarVehiculo
                }
            case 'propietario':
                return {
                    ...state,
                    formNuevoPropietario: action.payload.formNuevoPropietario,
                    formBuscarPropietario:action.payload.formBuscarPropietario,
                    formEditarPropietario: action.payload.formEditarPropietario,
                    formEliminarPropietario: action.payload.formEliminarPropietario
                }
            case 'codigo_postal':
                return {
                    ...state,
                    formNuevoCodigoPostal: action.payload.formNuevoCodigoPostal,
                    formBuscarCodigoPostal: action.payload.formBuscarCodigoPostal,
                    formEditarCodigoPostal: action.payload.formEditarCodigoPostal,
                    formEliminarCodigoPostal: action.payload.formEliminarCodigoPostal,
                    tablaCodigosPostales: action.payload.tablaCodigosPostales,
                    codigoPostalPorCodigo: action.payload.codigoPostalPorCodigo,
                    codigoPostalPorLocalidad: action.payload.codigoPostalPorLocalidad,
                    codigoPostalPorProvincia: action.payload.codigoPostalPorProvincia,
                    editarCodigoPostal: action.payload.editarCodigoPostal,
                    eliminarCodigoPostal: action.payload.eliminarCodigoPostal,
                    listaCodigosPostales: action.payload.listaCodigosPostales,
                }
            case 'actualizar_lista_codigos_postales':
                return {
                    ...state,
                    listaCodigosPostales: action.payload
                }
            
            case 'actualizar_lista_codigos_postales_por_codigo':
                return {
                    ...state,
                    listaCodigosPostalesPorCodigo: action.payload
                }
            case 'actualizar_lista_codigos_postales_por_localidad':
                return {
                    ...state,
                    listaCodigosPostalesPorLocalidad: action.payload
                }
            case 'actualizar_lista_codigos_postales_por_provincia':
                return {
                    ...state,
                    listaCodigosPostalesPorProvincia: action.payload
                }
            case 'cerrar_formulario_editar_codigo_postal':
                return {
                    ...state,
                    editarCodigoPostal: action.payload
                }               
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(DatosGeneralesFormReducer, DatosGeneralesFormInicial);

    function nuevoVehiculoFormDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: { 
                formNuevoVehiculo: true,
                formBuscarVehiculo: false,
                formEditarVehiculo: false,
                formEliminarVehiculo: false,
            }
        })
    }

    function buscarVehiculoFormDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: {
                formNuevoVehiculo: false,
                formBuscarVehiculo: true,
                formEditarVehiculo: false,
                formEliminarVehiculo: false,
            }
        })
    }

    function editarVehiculoFormDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: {
                formNuevoVehiculo: false,
                formBuscarVehiculo: false,
                formEditarVehiculo: true,
                formEliminarVehiculo: false,
            }
        })
    }

    function eliminarVehiculoFormDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: {
                formNuevoVehiculo: false,
                formBuscarVehiculo: false,
                formEditarVehiculo: false,
                formEliminarVehiculo: true,
            }
        })
    }

    function nuevoPropietarioFormDispatch() {
        dispatch({
            type: 'propietario',
            payload: { 
                formNuevoPropietario: true,
                formBuscarPropietario: false,
                formEditarPropietario: false,
                formEliminarPropietario: false
            }
        })
    }

    function buscarPropietarioFormDispatch() {
        dispatch({
            type: 'propietario',
            payload: {
                formNuevoPropietario: false,
                formBuscarPropietario: true,
                formEditarPropietario: false,
                formEliminarPropietario: false
            }
        })
    }

    function editarPropietarioFormDispatch() {
        dispatch({
            type: 'propietario',
            payload: {
                formNuevoPropietario: false,
                formBuscarPropietario: false,
                formEditarPropietario: true,
                formEliminarPropietario: false
            }
        })
    }

    function eliminarPropietarioFormDispatch() {
        dispatch({
            type: 'propietario',
            payload: {
                formNuevoPropietario: false,
                formBuscarPropietario: false,
                formEditarPropietario: false,
                formEliminarPropietario: true
            }
        })
    }

    function nuevoCodigoPostalFormDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: { 
                formNuevoCodigoPostal: true,
                formBuscarCodigoPostal: false,
                formEditarCodigoPostal: false,
                formEliminarCodigoPostal: false,
                tablaCodigosPostales: true,
                codigoPostalPorCodigo: false,
                codigoPostalPorLocalidad: false,
                codigoPostalPorProvincia: false,
                editarCodigoPostal: false,
                eliminarCodigoPostal: false,
                listaCodigosPostales: [],
            }
        })
    }

    function buscarCodigoPostalFormDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: {
                formNuevoCodigoPostal: false,
                formBuscarCodigoPostal: true,
                formEditarCodigoPostal: false,
                formEliminarCodigoPostal: false,
                tablaCodigosPostales: false,
                codigoPostalPorCodigo: false,
                codigoPostalPorLocalidad: false,
                codigoPostalPorProvincia: false,
                editarCodigoPostal: false,
                eliminarCodigoPostal: false,
                listaCodigosPostales: [],
            }
        })
    }

    function buscarCodigoPostalPorCodigoDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: {
                formNuevoCodigoPostal: false,
                formBuscarCodigoPostal: true,
                formEditarCodigoPostal: false,
                formEliminarCodigoPostal: false,
                tablaCodigosPostales: false,
                codigoPostalPorCodigo: true,
                codigoPostalPorLocalidad: false,
                codigoPostalPorProvincia: false,
                editarCodigoPostal: false,
                eliminarCodigoPostal: false,
                listaCodigosPostales: [],
            }
        })
    }

    function buscarCodigoPostalPorLocalidadDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: {
                formNuevoCodigoPostal: false,
                formBuscarCodigoPostal: true,
                formEditarCodigoPostal: false,
                formEliminarCodigoPostal: false,
                tablaCodigosPostales: false,
                codigoPostalPorCodigo: false,
                codigoPostalPorLocalidad: true,
                codigoPostalPorProvincia: false,
                editarCodigoPostal: false,
                eliminarCodigoPostal: false,
                listaCodigosPostales: [],
            }
        })
    }

    function  buscarCodigosPostalesPorProvinciaDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: {
                formNuevoCodigoPostal: false,
                formBuscarCodigoPostal: true,
                formEditarCodigoPostal: false,
                formEliminarCodigoPostal: false,
                tablaCodigosPostales: false,
                codigoPostalPorCodigo: false,
                codigoPostalPorLocalidad: false,
                codigoPostalPorProvincia: true,
                editarCodigoPostal: false,
                eliminarCodigoPostal: false,
                listaCodigosPostales: [], 
            }
        })
    }

    function buscarCodigoPostalParaEditarDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: {
                formNuevoCodigoPostal: false,
                formBuscarCodigoPostal: false,
                formEditarCodigoPostal: true,
                formEliminarCodigoPostal: false,
                tablaCodigosPostales: false,
                codigoPostalPorCodigo: false,
                codigoPostalPorLocalidad: false,
                codigoPostalPorProvincia: false,
                editarCodigoPostal: false,
                eliminarCodigoPostal: false,
                listaCodigosPostales: [], 
            }
        })
    }

    function buscarCodigoPostalParaEliminarDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: {
                formNuevoCodigoPostal: false,
                formBuscarCodigoPostal: false,
                formEditarCodigoPostal: false,
                formEliminarCodigoPostal: true,
                tablaCodigosPostales: false,
                codigoPostalPorCodigo: false,
                codigoPostalPorLocalidad: false,
                codigoPostalPorProvincia: false,
                editarCodigoPostal: false,
                eliminarCodigoPostal: false,
                listaCodigosPostales: [], 
            }
        })
    }


    function editarCodigoPostalFormDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: {
                formNuevoCodigoPostal: false,
                formBuscarCodigoPostal: false,
                formEditarCodigoPostal: true,
                formEliminarCodigoPostal: false,
                tablaCodigosPostales: false,
                codigoPostalPorCodigo: false,
                codigoPostalPorLocalidad: false,
                codigoPostalPorProvincia: false,
                editarCodigoPostal: true,
                eliminarCodigoPostal: false,
                listaCodigosPostales: [],
            }
        })
    }

    function eliminarCodigoPostalFormDispatch() {
        dispatch({
            type: 'codigo_postal',
            payload: {
                formNuevoCodigoPostal: false,
                formBuscarCodigoPostal: false,
                formEditarCodigoPostal: false,
                formEliminarCodigoPostal: true,
                tablaCodigosPostales: false,
                codigoPostalPorCodigo: false,
                codigoPostalPorLocalidad: false,
                codigoPostalPorProvincia: false,
                editarCodigoPostal: false,
                eliminarCodigoPostal: true,
                listaCodigosPostales: [],
            }
        })
    }

    return (
        <DatosGeneralesFormContext.Provider value =
            {{
                state,
                nuevoVehiculoFormDispatch,
                buscarVehiculoFormDispatch,
                editarVehiculoFormDispatch,
                eliminarVehiculoFormDispatch,
                nuevoPropietarioFormDispatch,
                buscarPropietarioFormDispatch,
                editarPropietarioFormDispatch,
                eliminarPropietarioFormDispatch,
                nuevoCodigoPostalFormDispatch,
                buscarCodigoPostalFormDispatch,
                buscarCodigoPostalParaEditarDispatch,
                buscarCodigoPostalParaEliminarDispatch,
                editarCodigoPostalFormDispatch,
                eliminarCodigoPostalFormDispatch,  
                ListarCodigosPostales,
                ListarCodigosPostalesPorCodigo,
                ListarCodigosPostalesPorLocalidad,
                ListarCodigosPostalesPorProvincia,
                ObtenerCodigoPostalPorCodigoParaEditar,
                ObtenerCodigoPostalPorCodigoParaEliminar,
                CerrarFormEditarCodigoPostal
            }}
        >
            <Grid container>
                <Grid item xs = {12}>
                    <Box>
                        <NavBarDatosGenerales></NavBarDatosGenerales>
                    </Box>
                </Grid>
                <Grid item md = {4}>
                    <Box sx={{textAlign: 'center', mt: 1}}>
                        <Typography variant="h7" gutterBottom>VEHICULOS</Typography>
                    </Box>
                    <Box>
                        <Vehiculos></Vehiculos>
                    </Box>    
                </Grid>
                <Grid item md = {4}>
                    <Box sx={{textAlign: 'center', mt: 1}}>
                        <Typography variant="h7" gutterBottom>PROPIETARIOS</Typography>
                    </Box>
                    <Box>
                        <Propietarios></Propietarios>
                    </Box>
                </Grid>
                <Grid item md = {4}>
                    <Box sx={{textAlign: 'center', mt: 1}}>
                        <Typography variant="h7" gutterBottom>CODIGOS POSTALES</Typography>
                    </Box>
                    <Box>
                        <CodigosPostales></CodigosPostales>
                    </Box>
                </Grid>
                <ModalErrores openError={openError} message={message} handleCloseError={handleCloseError}></ModalErrores>
            </Grid>        
        </DatosGeneralesFormContext.Provider>

    )
}

export default DatosGenerales
