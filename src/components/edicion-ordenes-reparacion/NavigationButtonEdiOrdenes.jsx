import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import Tooltip from '@mui/material/Tooltip';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NavigationButtonEdiOrdenes() {
  const [value, setValue] = useState('modificarPiezas');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={value} onChange={handleChange}>
      <Tooltip title="modificar piezas">
        <BottomNavigationAction
          label="modificarPiezas"
          value="modificarPiezas"
          icon={<PlaylistAddIcon />}
          // onClick={}
        />
      </Tooltip>
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

export default NavigationButtonEdiOrdenes;
