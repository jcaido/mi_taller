import React, { useContext } from 'react';
import { Box  } from '@mui/material';
import NavigationButtonCodigosPostales from './NavigationButtonCodigosPostales';
import NuevoCodigoPostalForm from './forms/NuevoCodigoPostalForm';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';
import TablaCodigosPostales from './TablaCodigosPostales';
import BuscarCodigoPostalForm from './forms/BuscarCodigoPostalForm';
import EditarCodigoPostalForm from './forms/EditarCodigoPostalForm';
import CodigoPostal from './CodigoPostal';
import TablaCodigosPostalesPorProvincia from './TablaCodigosPostalesPorProvincia';
import BuscarCodigoPostalParaEditarForm from './forms/BuscarCodigoPostalParaEditarForm';
import BuscarCodigoPostalParaEliminarForm from './forms/BuscarCodigoPostalParaEliminarForm';
import EliminarCodigoPostalForm from './forms/EliminarCodigoPostalForm';

const CodigosPostales = () => {

  const {state} = useContext(DatosGeneralesFormContext);

  return (
    <Box>
      <Box mt = {1}>
        <NavigationButtonCodigosPostales></NavigationButtonCodigosPostales>
      </Box>
      <Box>
        { state.formNuevoCodigoPostal && <NuevoCodigoPostalForm ></NuevoCodigoPostalForm> }
        { state.formBuscarCodigoPostal && <BuscarCodigoPostalForm></BuscarCodigoPostalForm>}
        { state.formEditarCodigoPostal && <BuscarCodigoPostalParaEditarForm></BuscarCodigoPostalParaEditarForm>}
        { state.formEliminarCodigoPostal && <BuscarCodigoPostalParaEliminarForm></BuscarCodigoPostalParaEliminarForm>}
      </Box>
      <Box>
        { state.tablaCodigosPostales &&  <TablaCodigosPostales></TablaCodigosPostales> }
        { state.codigoPostalPorCodigo && state.listaCodigosPostalesPorCodigo !== null && <CodigoPostal></CodigoPostal> }
        { state.codigoPostalPorLocalidad && state.listaCodigosPostalesPorLocalidad !== null && <CodigoPostal></CodigoPostal> } 
        { state.codigoPostalPorProvincia && <TablaCodigosPostalesPorProvincia></TablaCodigosPostalesPorProvincia>}
      </Box>
      <Box>
        {state.editarCodigoPostal && <EditarCodigoPostalForm></EditarCodigoPostalForm>}
        {state.eliminarCodigoPostal && <EliminarCodigoPostalForm></EliminarCodigoPostalForm>}
      </Box> 
    </Box>
    
  )
}

export default CodigosPostales
