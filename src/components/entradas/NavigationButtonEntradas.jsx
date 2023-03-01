import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import ToysIcon from '@mui/icons-material/Toys';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import useNavigationButton from '../../hooks/useNavigationButton';

export default function NavigationButtonEntradas({ crearAlbaran, editarAlbaran, addEntradas }) {
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
      <Tooltip title="editar albarán">
        <BottomNavigationAction
          label="editar"
          value="editar"
          icon={<CreateIcon />}
          onClick={editarAlbaran}
        />
      </Tooltip>
      <Tooltip title="añadir entradas a un albarán">
        <BottomNavigationAction
          label="addEntradas"
          value="addEntradas"
          icon={<ToysIcon />}
          onClick={addEntradas}
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
