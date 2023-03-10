import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Tooltip from '@mui/material/Tooltip';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import useNavigationButton from '../../hooks/useNavigationButton';

function NavigationButtonAutOrdenes({
  nueva, buscar, buscarParaEditar, buscarParaEliminar, imprimir,
}) {
  const changeButton = useNavigationButton('nuevo');

  const navigate = useNavigate();

  return (
    <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={changeButton.value} onChange={changeButton.handleChange}>
      <Tooltip title="nueva orden de reparacion">
        <BottomNavigationAction
          label="Nuevo"
          value="nuevo"
          icon={<PlaylistAddIcon />}
          onClick={nueva}
        />
      </Tooltip>
      <Tooltip title="buscar orden de reparacion">
        <BottomNavigationAction
          label="Buscar"
          value="buscar"
          icon={<FindInPageIcon />}
          onClick={buscar}
        />
      </Tooltip>
      <Tooltip title="editar orden de reparacion">
        <BottomNavigationAction
          label="Editar"
          value="editar"
          icon={<CreateIcon />}
          onClick={buscarParaEditar}
        />
      </Tooltip>
      <Tooltip title="eliminar orden de reparacion">
        <BottomNavigationAction
          label="Eliminar"
          value="eliminar"
          icon={<DeleteIcon />}
          onClick={buscarParaEliminar}
        />
      </Tooltip>
      <Tooltip title="imprimir autorizacion">
        <BottomNavigationAction
          label="Imprimir"
          value="imprimir"
          icon={<PrintIcon />}
          onClick={imprimir}
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

export default NavigationButtonAutOrdenes;
