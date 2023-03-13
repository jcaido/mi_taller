import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import useNavigationButton from '../../hooks/useNavigationButton';

export default function NavigationButtonFacturacionProveedores(
  {
    crearFactura,
    editarFactura,
    eliminarFactura,
  },
) {
  const changeButton = useNavigationButton('seleccionar');

  const navigate = useNavigate();

  return (
    <BottomNavigation sx={{ width: 500, height: 30, backgroundColor: '#fefae0' }} value={changeButton.value} onChange={changeButton.handleChange}>
      <Tooltip title="crear factura">
        <BottomNavigationAction
          label="crear"
          value="crear"
          icon={<PlaylistAddIcon />}
          onClick={crearFactura}
        />
      </Tooltip>
      <Tooltip title="editar factura">
        <BottomNavigationAction
          label="editar"
          value="editar"
          icon={<CreateIcon />}
          onClick={editarFactura}
        />
      </Tooltip>
      <Tooltip title="eliminar factura">
        <BottomNavigationAction
          label="eliminar"
          value="eliminar"
          icon={<DeleteIcon />}
          onClick={eliminarFactura}
        />
      </Tooltip>
      <Tooltip title="volver opciones-almacen">
        <BottomNavigationAction
          label="volverOpciones"
          value="volverOpciones"
          icon={<ArrowBackIcon />}
          onClick={() => navigate('/facturacion/opciones')}
        />
      </Tooltip>
    </BottomNavigation>
  );
}
