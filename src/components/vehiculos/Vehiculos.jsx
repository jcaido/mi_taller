import React, { useContext } from 'react';
import { Box  } from '@mui/material';
import NavigationButtonVehiculos from './NavigationButtonVehiculos';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

const Vehiculos = () => {

  const {state} = useContext(DatosGeneralesFormContext);

  return (
    <Box>
      <Box mt = {1}>
        <NavigationButtonVehiculos></NavigationButtonVehiculos>  
      </Box>
      <Box>
        { state.formNuevoVehiculo && <p>nuevo vehiculo</p>}
        { state.formBuscarVehiculo && <p>buscar vehiculo</p>}
        { state.formEditarVehiculo && <p>editar vehiculo</p>}
        { state.formEliminarVehiculo && <p>eliminar vehiculo</p>}
      </Box>
    </Box>
  )
}

export default Vehiculos
