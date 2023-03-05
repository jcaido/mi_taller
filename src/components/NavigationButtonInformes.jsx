import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Tooltip from '@mui/material/Tooltip';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useNavigationButton from '../hooks/useNavigationButton';

function NavigationButtonInfoOrdenes({ botonRegresar }) {
  const changeButton = useNavigationButton('modificarPiezas');

  return (
    <BottomNavigation sx={{ width: 100, height: 30, backgroundColor: '#fefae0' }} value={changeButton.value} onChange={changeButton.handleChange}>
      <Tooltip title="volver a opciones-reparacion taller">
        <BottomNavigationAction
          label="VolverOpciones"
          value="volverOpciones"
          icon={<ArrowBackIcon />}
          onClick={botonRegresar}
        />
      </Tooltip>
    </BottomNavigation>
  );
}

export default NavigationButtonInfoOrdenes;
