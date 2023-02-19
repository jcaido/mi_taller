import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import Tooltip from '@mui/material/Tooltip';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EuroIcon from '@mui/icons-material/Euro';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useNavigationButton from '../../hooks/useNavigationButton';

function NavigationButtonEdiOrdenes({
  establecerPrecioManoDeObra,
  buscarOrdenReparacion,
}) {
  const changeButton = useNavigationButton('seleccionar');

  const navigate = useNavigate();

  return (
    <BottomNavigation sx={{ width: 200, height: 30, backgroundColor: '#fefae0' }} value={changeButton.value} onChange={changeButton.handleChange}>
      <Tooltip title="seleccionar orden de reparación">
        <BottomNavigationAction
          label="Seleccionar"
          value="seleccionar"
          icon={<ContentPasteSearchIcon />}
          onClick={buscarOrdenReparacion}
        />
      </Tooltip>
      <Tooltip title="establecer precio mano de obra">
        <BottomNavigationAction
          label="Establecer"
          value="establecer"
          icon={<EuroIcon />}
          onClick={establecerPrecioManoDeObra}
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
