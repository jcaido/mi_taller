import React, {
  useState,
  createContext,
  useReducer,
  useMemo,
} from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import EdicionOrdenes from '../components/edicion-ordenes-reparacion/EdicionOrdenes';
import { obtenerOrdenReparacionPorIdCompleta } from '../services/axiosService';
import ModalErrores from '../utils/ModalErrores';

export const EdicionOrdenesContext = createContext();

function TallerEdicionOrdenes() {
  const [openError, setOpenError] = useState(false);
  const [message, setMensaje] = useState('');
  const handleOpenError = (messag) => {
    setOpenError(true);
    setMensaje(messag);
  };

  const handleCloseError = () => setOpenError(false);

  const edicionOrdenesReparacionInicial = {
    formPiezas: false,
    formManoDeObra: false,
    formCierreOrden: false,
    informacionOrdenReparacion: false,
    formAbrirOrdenReparacion: false,
    ordenReparacionPorId: [],
  };

  const edicionOrdenesReducer = (state, action) => {
    switch (action.type) {
      case 'edicionOrdenReparacion':
        return {
          ...state,
          formPiezas: action.payload.formPiezas,
          formManoDeObra: action.payload.formManoDeObra,
          formCierreOrden: action.payload.formCierreOrden,
          informacionOrdenReparacion: action.payload.informacionOrdenReparacion,
          formAbrirOrdenReparacion: action.payload.formAbrirOrdenReparacion,
        };
      case 'actualizar_lista_ordenes_reparacion_por_id':
        return {
          ...state,
          ordenReparacionPorId: action.payload,
        };
      case 'cerrar_formularios_piezas':
        return {
          ...state,
          formPiezas: action.payload,
        };
      case 'cerrar_formularios_mano_de_obra':
        return {
          ...state,
          formManoDeObra: action.payload,
        };
      case 'cerrar_formularios_cierre_orden':
        return {
          ...state,
          formCierreOrden: action.payload,
        };
      case 'cerrar_informacion_orden_reparacion':
        return {
          ...state,
          informacionOrdenReparacion: action.payload,
        };
      case 'cerrar_formulario_abrir_orden_reparacion':
        return {
          ...state,
          formAbrirOrdenReparacion: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(edicionOrdenesReducer, edicionOrdenesReparacionInicial);

  function seleccionarOrdenReparacionFormDispatch() {
    dispatch({
      type: 'edicionOrdenReparacion',
      payload: {
        formPiezas: true,
        formManoDeObra: true,
        formCierreOrden: true,
        informacionOrdenReparacion: true,
        formAbrirOrdenReparacion: false,
      },
    });
  }

  function abrirOrdenReparacionFormDispatch() {
    dispatch({
      type: 'edicionOrdenReparacion',
      payload: {
        formPiezas: false,
        formManoDeObra: false,
        formCierreOrden: false,
        informacionOrdenReparacion: true,
        formAbrirOrdenReparacion: true,
      },
    });
  }

  const ObtenerOrdenReparacionPorIdParaCompletar = (id) => {
    obtenerOrdenReparacionPorIdCompleta(id)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_ordenes_reparacion_por_id', payload: response.data });
        if (response.data.cerrada) {
          abrirOrdenReparacionFormDispatch();
        } else {
          seleccionarOrdenReparacionFormDispatch();
        }
      })
      .catch((error) => error.response.status === 404
      && handleOpenError(error.response.data.mensaje));
  };

  const ObtenerOrdenReparacionPorIdParaActualizar = (id) => {
    obtenerOrdenReparacionPorIdCompleta(id)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_ordenes_reparacion_por_id', payload: response.data });
      });
  };

  const cerrarFormsPiezasMO = () => {
    dispatch({ type: 'cerrar_formularios_piezas', payload: false });
    dispatch({ type: 'cerrar_formularios_mano_de_obra', payload: false });
    dispatch({ type: 'cerrar_formularios_cierre_orden', payload: false });
    dispatch({ type: 'cerrar_informacion_orden_reparacion', payload: false });
    dispatch({ type: 'cerrar_formulario_abrir_orden_reparacion', payload: false });
  };

  const EdicionOrdenesProviderValue = useMemo(
    () => ({
      state,
      ObtenerOrdenReparacionPorIdParaCompletar,
      ObtenerOrdenReparacionPorIdParaActualizar,
      abrirOrdenReparacionFormDispatch,
      cerrarFormsPiezasMO,
    }
    ),
    [
      state,
      ObtenerOrdenReparacionPorIdParaCompletar,
      ObtenerOrdenReparacionPorIdParaActualizar,
      abrirOrdenReparacionFormDispatch,
      cerrarFormsPiezasMO,
    ],
  );

  return (
    <EdicionOrdenesContext.Provider value={EdicionOrdenesProviderValue}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="h7" gutterBottom>EDICION ORDENES DE REPARACION</Typography>
          </Box>
          <Box>
            <EdicionOrdenes />
          </Box>
        </Grid>
        <ModalErrores openError={openError} message={message} handleCloseError={handleCloseError} />
      </Grid>
    </EdicionOrdenesContext.Provider>
  );
}

export default TallerEdicionOrdenes;
