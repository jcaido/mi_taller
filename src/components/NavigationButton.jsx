import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import useNavigationButton from '../hooks/useNavigationButton';

function NavigationButton({
  nuevo,
  buscar,
  buscarParaEditar,
  buscarParaEliminar,
  nuevoTitle,
  buscarTitle,
  editarTitle,
  eliminarTitle,
}) {
  const changeButton = useNavigationButton('nuevo');

  return (
    <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={changeButton.value} onChange={changeButton.handleChange}>
      <Tooltip title={nuevoTitle}>
        <BottomNavigationAction
          label="Nuevo"
          value="nuevo"
          icon={<PlaylistAddIcon />}
          onClick={nuevo}
        />
      </Tooltip>
      <Tooltip title={buscarTitle}>
        <BottomNavigationAction
          label="Buscar"
          value="buscar"
          icon={<FindInPageIcon />}
          onClick={buscar}
        />
      </Tooltip>
      <Tooltip title={editarTitle}>
        <BottomNavigationAction
          label="Editar"
          value="editar"
          icon={<CreateIcon />}
          onClick={buscarParaEditar}
        />
      </Tooltip>
      <Tooltip title={eliminarTitle}>
        <BottomNavigationAction
          label="Eliminar"
          value="eliminar"
          icon={<DeleteIcon />}
          onClick={buscarParaEliminar}
        />
      </Tooltip>
    </BottomNavigation>
  );
}

export default NavigationButton;
