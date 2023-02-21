import React from 'react';
import { BottomNavigation } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useNavigationButton from '../../hooks/useNavigationButton';

export default function NavigationButtonPiezas({
  crearPieza, buscarPieza, editarPieza, eliminarPieza,
}) {
  const changeButton = useNavigationButton('seleccionar');

  const navigate = useNavigate();

  return (
    <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={changeButton.value} onChange={changeButton.handleChange}>
      <Tooltip title="crear pieza">
        <BottomNavigationAction
          label="crear"
          value="crear"
          icon={<PlaylistAddIcon />}
          onClick={crearPieza}
        />
      </Tooltip>
      <Tooltip title="buscar pieza">
        <BottomNavigationAction
          label="buscar"
          value="buscar"
          icon={<FindInPageIcon />}
          onClick={buscarPieza}
        />
      </Tooltip>
      <Tooltip title="editar pieza">
        <BottomNavigationAction
          label="editar"
          value="creeditarar"
          icon={<CreateIcon />}
          onClick={editarPieza}
        />
      </Tooltip>
      <Tooltip title="eliminar pieza">
        <BottomNavigationAction
          label="eliminar"
          value="eliminar"
          icon={<DeleteIcon />}
          onClick={eliminarPieza}
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
