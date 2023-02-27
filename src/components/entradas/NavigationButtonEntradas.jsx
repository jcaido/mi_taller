import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FactoryIcon from '@mui/icons-material/Factory';
import ToysIcon from '@mui/icons-material/Toys';
import Tooltip from '@mui/material/Tooltip';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import useNavigationButton from '../../hooks/useNavigationButton';

export default function NavigationButtonEntradas({ crearAlbaran, buscarProveedor, buscarPieza }) {
  const changeButton = useNavigationButton('seleccionar');

  const navigate = useNavigate();

  return (
    <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={changeButton.value} onChange={changeButton.handleChange}>
      <Tooltip title="crear albarán">
        <BottomNavigationAction
          label="crear"
          value="crear"
          icon={<PlaylistAddIcon />}
          onClick={crearAlbaran}
        />
      </Tooltip>
      <Tooltip title="proveedores">
        <BottomNavigationAction
          label="proveedores"
          value="proveedores"
          icon={<FactoryIcon />}
          onClick={buscarProveedor}
        />
      </Tooltip>
      <Tooltip title="piezas">
        <BottomNavigationAction
          label="piezas"
          value="piezas"
          icon={<ToysIcon />}
          onClick={buscarPieza}
        />
      </Tooltip>
      <Tooltip title="volver opciones-almacen">
        <BottomNavigationAction
          label="volverOpciones"
          value="volverOpciones"
          icon={<ArrowBackIcon />}
          onClick={() => navigate('/almacen/opciones')}
        />
      </Tooltip>
    </BottomNavigation>
  );
}
