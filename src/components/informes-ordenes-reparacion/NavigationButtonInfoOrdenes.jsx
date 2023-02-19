import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import Tooltip from '@mui/material/Tooltip';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useNavigationButton from '../../hooks/useNavigationButton';

function NavigationButtonInfoOrdenes() {
  const changeButton = useNavigationButton('modificarPiezas');

  const navigate = useNavigate();

  return (
    <BottomNavigation sx={{ width: 100, height: 30, backgroundColor: '#fefae0' }} value={changeButton.value} onChange={changeButton.handleChange}>
      <Tooltip title="volver a opciones-reparacion taller">
        <BottomNavigationAction
          label="VolverOpciones"
          value="volverOpciones"
          icon={<ArrowBackIcon />}
          onClick={() => navigate('/taller/opciones')}
        />
      </Tooltip>
    </BottomNavigation>
  );
}

export default NavigationButtonInfoOrdenes;
