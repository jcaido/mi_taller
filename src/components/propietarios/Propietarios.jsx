import React, { useContext } from 'react';
import { Box  } from '@mui/material';
import NavigationButtonPropietarios from './NavigationButtonPropietarios';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

const Propietarios = () => {

  const {state} = useContext(DatosGeneralesFormContext);


  return (
    <Box>
      <Box mt = {1}>
        <NavigationButtonPropietarios></NavigationButtonPropietarios>   
      </Box> 
      <Box>
        { state.formNuevoPropietario && <p>nuevo propietario</p>}
        { state.formBuscarPropietario && <p>buscar propietario</p>}
        { state.formEditarPropietario && <p>editar propietario</p>}
        { state.formEliminarPropietario && <p>eliminar propietario</p>}
      </Box>
    </Box>  
  )
}

export default Propietarios