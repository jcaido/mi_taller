import { useReducer, createContext, useState } from 'react';
import { Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import CodigosPostales from '../components/codigos-postales/CodigosPostales';
import Propietarios from '../components/propietarios/Propietarios';
import Vehiculos from '../components/vehiculos/Vehiculos';
import { obtenerCodigoPostalPorCodigo, obtenerCodigosPostales, obtenerCodigosPostalesPorLocalidad, obtenerCodigosPostalesPorProvincia, obtenerPropietarioPorDni, obtenerPropietarios,  obtenerPropietariosPorCodigoPostal,  obtenerPropietariosPorPrimerApellido, obtenerVehiculos, obtenerVehiculosPorMatricula, obtenerVehiculosPorMarcaModelo, obtenerVehiculosPorPropietario } from '../components/codigos-postales/axiosService';
import ModalErrores from '../utils/ModalErrores';
import NavBar from '../components/NavBar';

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

    const ListarPropietariosPorDni = (dni) => {
        obtenerPropietarioPorDni(dni)
            .then((response) => {
                dispatch({type:'actualizar_lista_propietarios_por_dni', payload: response.data})
            })
            .then(() => {
                buscarPropietarioPorDniDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ListarVehiculosPorMatricula = (matricula) => {
        obtenerVehiculosPorMatricula(matricula)
            .then((response) => {
                dispatch({type: 'actualizar_lista_vehiculos_por_matricula', payload: response.data})
            })
            .then(() => {
                buscarVehiculoPorMatriculaDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ListarVehiculosPorMarcaModelo = (marcaModelo) => {
        obtenerVehiculosPorMarcaModelo(marcaModelo)
            .then((response) => {
                dispatch({type: 'actualizar_lista_vehiculos_por_marca_modelo', payload: response.data})
            })
            .then(() => {
                buscarVehiculosPorMarcaModeloDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

   const ListarPropietariosPorPrimerApellido = (primerApellido) => {
        obtenerPropietariosPorPrimerApellido(primerApellido)
            .then((response) => {
                dispatch({type:'actualizar_lista_propietarios_por_primer_apellido', payload: response.data})
            })
            .then(() => {
                buscarPropietariosPorPrimerApellidoDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ListarPropietariosPorCodigoPostal =  (codigo) => {
        obtenerCodigoPostalPorCodigo(codigo)
            .then((response) => {
                obtenerPropietariosPorCodigoPostal(response.data.id)
                    .then((response) => {
                        dispatch({type:'actualizar_lista_propietarios_por_codigo_postal', payload: response.data})
                    })
                    .then(()=> {
                        buscarPropietariosPorCodigoPostalDispatch();
                    })
            })
            .catch((error)=> {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ListarVehiculosPorDniPropietario = (dni) => {
        obtenerPropietarioPorDni(dni)
            .then((response) => {
                obtenerVehiculosPorPropietario(response.data.id)
                    .then((response) => {
                        dispatch({type: 'actualizar_lista_vehiculos_por_propietario', payload: response.data})
                    })
                    .then(() => {
                        buscarVehiculosPorDniPropietarioDispatch();
                    })
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

    const ObtenerPropietarioPorDniParaEditar = (dni) => {
        obtenerPropietarioPorDni(dni)
            .then((response) => {
                dispatch({type:'actualizar_lista_propietarios_por_dni', payload: response.data})
            })
            .then(() => {
                editarPropietarioFormDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje);
            })
    }

    const ObtenerVehiculoPorMatriculaParaEditar = (matricula) => {
        obtenerVehiculosPorMatricula(matricula)
            .then((response) => {
                dispatch({type: 'actualizar_lista_vehiculos_por_matricula', payload: response.data})
            })
            .then(() => {
                editarVehiculoFormDispatch();
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

    const obtenerPropietarioPorDniParaEliminar = (dni) => {
        obtenerPropietarioPorDni(dni)
            .then((response) => {
                dispatch({type:'actualizar_lista_propietarios_por_dni', payload: response.data})
            })
            .then(() => {
                eliminarPropietarioFormDispatch();
            })
            .catch((error) => {
                error.response.status === 404 && handleOpenError(error.response.data.mensaje)
            })
    }

    const obtenerVehiculoPorMatriculaParaEliminar = (matricula) => {
        obtenerVehiculosPorMatricula(matricula)
            .then((response) => {
                dispatch({type: 'actualizar_lista_vehiculos_por_matricula', payload: response.data})
            })
            .then(() => {
                eliminarVehiculoFormDispatch();
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

    const ListarPropietarios = () => {
        obtenerPropietarios()
            .then((response) => {
                dispatch({type: 'actualizar_lista_propietarios', payload: response.data})
            })
            .catch((error) => {
                alert(`ERROR: ${error.response.data.mensaje}`);
            })
    }

    const ListarVehiculos = () => {
        obtenerVehiculos()
            .then((response) => {
                dispatch({type: 'actualizar_lista_vehiculos', payload: response.data})
            })
            .catch((error) => {
                alert(`ERROR: ${error.response.data.mensaje}`);
            })
    }

    const CerrarFormEditarPropietario = () => {
        dispatch({type:'cerrar_formulario_editar_propietario', payload: false})
    }

    const CerrarFormEditarVehiculo = () => {
        dispatch({type: 'cerrar_formulario_editar_vehiculo', payload: false})
    }

    const DatosGeneralesFormInicial = {
        formNuevoVehiculo: false,
        formBuscarVehiculo: false,
        formEditarVehiculo: false,
        formEliminarVehiculo: false,
        tablaVehiculos: false,
        vehiculoPorMatricula: false,
        vehiculosPorMarcaModelo: false,
        vehiculosPorPropietario: false,
        editarVehiculo: false,
        eliminarVehiculo: false,
        listaVehiculos: [],
        listaVehiculosPorMatricula: [],
        listaVehiculosPorMarcaModelo: [],
        listaVehiculosPorPropietario: [],

        formNuevoPropietario: false,
        formBuscarPropietario: false,
        formEditarPropietario: false,
        formEliminarPropietario: false,
        tablaPropietarios: false,
        propietarioPorDni: false,
        propietariosPorPrimerApellido: false,
        propietariosPorCodigoPostal: false,
        editarPropietario: false,
        eliminarPropietario: false,
        listaPropietarios: [],
        listaPropietariosPorDni: [],
        listaPropietariosPorPrimerApellido: [],
        listaPropietariosPorCodigoPostal: [],

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
                    formEliminarVehiculo: action.payload.formEliminarVehiculo,
                    tablaVehiculos: action.payload.tablaVehiculos,
                    vehiculoPorMatricula: action.payload.vehiculoPorMatricula,
                    vehiculosPorMarcaModelo: action.payload.vehiculosPorMarcaModelo,
                    vehiculosPorPropietario: action.payload.vehiculosPorPropietario,
                    editarVehiculo: action.payload.editarVehiculo,
                    eliminarVehiculo: action.payload.eliminarVehiculo
                }
            case 'propietario':
                return {
                    ...state,
                    formNuevoPropietario: action.payload.formNuevoPropietario,
                    formBuscarPropietario:action.payload.formBuscarPropietario,
                    formEditarPropietario: action.payload.formEditarPropietario,
                    formEliminarPropietario: action.payload.formEliminarPropietario,
                    tablaPropietarios: action.payload.tablaPropietarios,
                    propietarioPorDni: action.payload.propietarioPorDni,
                    propietariosPorPrimerApellido: action.payload.propietariosPorPrimerApellido,
                    propietariosPorCodigoPostal: action.payload.propietariosPorCodigoPostal,
                    editarPropietario: action.payload.editarPropietario,
                    eliminarPropietario: action.payload.eliminarPropietario,
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
            case 'actualizar_lista_propietarios':
                return {
                    ...state,
                    listaPropietarios: action.payload
                }
            case 'actualizar_lista_propietarios_por_dni':
                return {
                    ...state,
                    listaPropietariosPorDni: action.payload
                }
            case 'actualizar_lista_propietarios_por_primer_apellido':
                return {
                    ...state,
                    listaPropietariosPorPrimerApellido: action.payload
                }
            case 'actualizar_lista_propietarios_por_codigo_postal':
                return {
                    ...state,
                    listaPropietariosPorCodigoPostal: action.payload
                }
            case 'cerrar_formulario_editar_propietario':
                return {
                    ...state,
                    editarPropietario: action.payload
                }
            case 'actualizar_lista_vehiculos':
                return {
                    ...state,
                    listaVehiculos: action.payload
                }
            case 'actualizar_lista_vehiculos_por_matricula':
                return {
                    ...state,
                    listaVehiculosPorMatricula: action.payload
                }
            case 'actualizar_lista_vehiculos_por_marca_modelo':
                return {
                    ...state,
                    listaVehiculosPorMarcaModelo: action.payload
                }
            case 'actualizar_lista_vehiculos_por_propietario':
                return {
                    ...state,
                    listaVehiculosPorPropietario: action.payload
                }
            case 'cerrar_formulario_editar_vehiculo':
                return {
                    ...state,
                    editarVehiculo: action.payload
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
                tablaVehiculos: true,
                vehiculoPorMatricula: false,
                vehiculosPorMarcaModelo: false,
                editarVehiculo: false,
                eliminarVehiculo: false
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
                tablaVehiculos: false,
                vehiculoPorMatricula: false,
                vehiculosPorMarcaModelo: false,
                editarVehiculo: false,
                eliminarVehiculo: false,
                listaVehiculos: []
            }
        })
    }

    function buscarVehiculoPorMatriculaDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: {
                formNuevoVehiculo: false,
                formBuscarVehiculo: true,
                formEditarVehiculo: false,
                formEliminarVehiculo: false,
                tablaVehiculos: false,
                vehiculoPorMatricula: true,
                vehiculosPorMarcaModelo: false,
                editarVehiculo: false,
                eliminarVehiculo: false,
                listaVehiculos: []                
            }
        })
    }

    function buscarVehiculosPorMarcaModeloDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: {
                formNuevoVehiculo: false,
                formBuscarVehiculo: true,
                formEditarVehiculo: false,
                formEliminarVehiculo: false,
                tablaVehiculos: false,
                vehiculoPorMatricula: false,
                vehiculosPorMarcaModelo: true,
                vehiculosPorPropietario: false,
                editarVehiculo: false,
                eliminarVehiculo: false,
                listaVehiculos: []                 
            }
        })
    }

    function buscarVehiculosPorDniPropietarioDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: {
                formNuevoVehiculo: false,
                formBuscarVehiculo: true,
                formEditarVehiculo: false,
                formEliminarVehiculo: false,
                tablaVehiculos: false,
                vehiculoPorMatricula: false,
                vehiculosPorMarcaModelo: false,
                vehiculosPorPropietario: true,
                editarVehiculo: false,
                eliminarVehiculo: false,
                listaVehiculos: []                
            }
        })
    }

    function buscarVehiculoParaEditarDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: {
                formNuevoVehiculo: false,
                formBuscarVehiculo: false,
                formEditarVehiculo: true,
                formEliminarVehiculo: false,
                tablaVehiculos: false,
                vehiculoPorMatricula: false,
                vehiculosPorMarcaModelo: false,
                vehiculosPorPropietario: false,
                editarVehiculo: false,
                eliminarVehiculo: false,
                listaVehiculos: []                
            }
        })
    }

    function buscarVehiculoParaEliminarDispatch() {
        dispatch({
            type: 'vehiculo',
            payload: {
                formNuevoVehiculo: false,
                formBuscarVehiculo: false,
                formEditarVehiculo: false,
                formEliminarVehiculo: true, 
                tablaVehiculos: false,
                vehiculoPorMatricula: false,
                vehiculosPorMarcaModelo: false,
                vehiculosPorPropietario: false,
                editarVehiculo: false,
                eliminarVehiculo: false,
                listaVehiculos: []                               
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
                tablaVehiculos: false,
                vehiculoPorMatricula: false,
                vehiculosPorMarcaModelo: false,
                vehiculosPorPropietario: false,
                editarVehiculo: true,
                eliminarVehiculo: false,
                listaVehiculos: []                
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
                tablaVehiculos: false,
                vehiculoPorMatricula: false,
                vehiculosPorMarcaModelo: false,
                vehiculosPorPropietario: false,
                editarVehiculo: false,
                eliminarVehiculo: true,
                listaVehiculos: []                
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
                formEliminarPropietario: false,
                tablaPropietarios: true,
                propietarioPorDni: false,
                propietariosPorPrimerApellido: false,
                propietariosPorCodigoPostal: false,
                editarPropietario: false,
                eliminarPropietario: false,
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
                formEliminarPropietario: false,
                tablaPropietarios: false,
                propietarioPorDni: false,
                propietariosPorPrimerApellido: false,
                propietariosPorCodigoPostal: false,
                editarPropietario: false,
                eliminarPropietario: false,
                listaPropietarios: []
            }
        })
    }

    function buscarPropietarioPorDniDispatch() {
        dispatch({
            type: 'propietario',
            payload: {
                formNuevoPropietario: false,
                formBuscarPropietario: true,
                formEditarPropietario: false,
                formEliminarPropietario: false,
                tablaPropietarios: false,
                propietarioPorDni: true,
                propietariosPorPrimerApellido: false,
                propietariosPorCodigoPostal: false,
                editarPropietario: false,
                eliminarPropietario: false,
                listaPropietarios: []
            }
        })
    }

    function buscarPropietariosPorPrimerApellidoDispatch() {
        dispatch({
            type: 'propietario',
            payload: {
                formNuevoPropietario: false,
                formBuscarPropietario: true,
                formEditarPropietario: false,
                formEliminarPropietario: false,
                tablaPropietarios: false,
                propietarioPorDni: false,
                propietariosPorPrimerApellido: true,
                propietariosPorCodigoPostal: false,
                editarPropietario: false,
                eliminarPropietario: false,
                listaPropietarios: []                
            }
        })
    }

    function buscarPropietariosPorCodigoPostalDispatch() {
        dispatch({
            type: 'propietario',
            payload: {
                formNuevoPropietario: false,
                formBuscarPropietario: true,
                formEditarPropietario: false,
                formEliminarPropietario: false,
                tablaPropietarios: false,
                propietarioPorDni: false,
                propietariosPorPrimerApellido: false,
                propietariosPorCodigoPostal: true,
                editarPropietario: false,
                eliminarPropietario: false,
                listaPropietarios: []
            }
        })
    }

    function buscarPropietarioParaEditarDispatch() {
        dispatch({
            type: 'propietario',
            payload: {
                formNuevoPropietario: false,
                formBuscarPropietario: false,
                formEditarPropietario: true,
                formEliminarPropietario: false,
                tablaPropietarios: false,
                propietarioPorDni: false,
                propietariosPorPrimerApellido: false,
                propietariosPorCodigoPostal: false,
                editarPropietario: false,
                eliminarPropietario: false,
                listaPropietarios: []                
            }
        })
    }

    function buscarPropietarioParaEliminarDispatch() {
        dispatch({
            type: 'propietario',
            payload: {
                formNuevoPropietario: false,
                formBuscarPropietario: false,
                formEditarPropietario: false,
                formEliminarPropietario: true,
                tablaPropietarios: false,
                propietarioPorDni: false,
                propietariosPorPrimerApellido: false,
                propietariosPorCodigoPostal: false,
                editarPropietario: false,
                eliminarPropietario: false,
                listaPropietarios: []                
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
                formEliminarPropietario: false,
                tablaPropietarios: false,
                propietarioPorDni: false,
                propietariosPorPrimerApellido: false,
                propietariosPorCodigoPostal: false,
                editarPropietario: true,
                eliminarPropietario: false,
                listaPropietarios: []
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
                formEliminarPropietario: true,
                tablaPropietarios: false,
                propietarioPorDni: false,
                propietariosPorPrimerApellido: false,
                propietariosPorCodigoPostal: false,
                editarPropietario: false,
                eliminarPropietario: true,
                listaPropietarios: []
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
                buscarVehiculoParaEditarDispatch,
                buscarVehiculoParaEliminarDispatch,
                editarVehiculoFormDispatch,
                eliminarVehiculoFormDispatch,
                nuevoPropietarioFormDispatch,
                buscarPropietarioFormDispatch,
                buscarPropietarioParaEditarDispatch,
                buscarPropietarioParaEliminarDispatch,
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
                CerrarFormEditarCodigoPostal,
                ListarPropietarios,
                ListarPropietariosPorDni,
                ListarPropietariosPorPrimerApellido,
                ListarPropietariosPorCodigoPostal,
                ObtenerPropietarioPorDniParaEditar,
                CerrarFormEditarPropietario,
                obtenerPropietarioPorDniParaEliminar,
                ListarVehiculosPorMatricula,
                ListarVehiculos,
                ListarVehiculosPorMarcaModelo,
                ListarVehiculosPorDniPropietario,
                CerrarFormEditarVehiculo,
                ObtenerVehiculoPorMatriculaParaEditar,
                obtenerVehiculoPorMatriculaParaEliminar
            }}
        >
            <Grid container>
                <Grid item xs = {12}>
                    <Box>
                        <NavBar
                            pages = {['INICIO', 'TALLER', 'FACTURACION', 'CONTABILIDAD']}
                            pagina = "DATOS GENERALES"
                        />
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
