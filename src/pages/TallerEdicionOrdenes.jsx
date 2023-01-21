import React, {
  useState,
  createContext,
  useReducer,
  useMemo,
} from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import EdicionOrdenes from '../components/edicion-ordenes-reparacion/EdicionOrdenes';
import { obtenerOrdenReparacionPorId } from '../services/axiosService';
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
      },
    });
  }

  const ObtenerOrdenReparacionPorIdParaCompletar = (id) => {
    obtenerOrdenReparacionPorId(id)
      .then((response) => {
        dispatch({ type: 'actualizar_lista_ordenes_reparacion_por_id', payload: response.data });
      })
      .then(() => {
        seleccionarOrdenReparacionFormDispatch();
      })
      .catch((error) => error.response.status === 404
      && handleOpenError(error.response.data.mensaje));
  };

  const cerrarFormsPiezasMO = () => {
    dispatch({ type: 'cerrar_formularios_piezas', payload: false });
    dispatch({ type: 'cerrar_formularios_mano_de_obra', payload: false });
    dispatch({ type: 'cerrar_formularios_cierre_orden', payload: false });
  };

  const EdicionOrdenesProviderValue = useMemo(
    () => ({
      state,
      ObtenerOrdenReparacionPorIdParaCompletar,
      cerrarFormsPiezasMO,
    }
    ),
    [
      state,
      ObtenerOrdenReparacionPorIdParaCompletar,
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
