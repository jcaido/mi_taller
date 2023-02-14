import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import Tooltip from '@mui/material/Tooltip';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteIcon from '@mui/icons-material/Delete';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NavigationButtonProveedores({
  crearProveedor, buscarProveedor, editarProveedor, eliminarProveedor,
}) {
  const [value, setValue] = useState('seleccionar');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={value} onChange={handleChange}>
      <Tooltip title="crear proveedor">
        <BottomNavigationAction
          label="crear"
          value="crear"
          icon={<PlaylistAddIcon />}
          onClick={crearProveedor}
        />
      </Tooltip>
      <Tooltip title="buscar proveedor">
        <BottomNavigationAction
          label="buscar"
          value="buscar"
          icon={<FindInPageIcon />}
          onClick={buscarProveedor}
        />
      </Tooltip>
      <Tooltip title="editar proveedor">
        <BottomNavigationAction
          label="editar"
          value="creeditarar"
          icon={<CreateIcon />}
          onClick={editarProveedor}
        />
      </Tooltip>
      <Tooltip title="eliminar proveedor">
        <BottomNavigationAction
          label="eliminar"
          value="eliminar"
          icon={<DeleteIcon />}
          onClick={eliminarProveedor}
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
