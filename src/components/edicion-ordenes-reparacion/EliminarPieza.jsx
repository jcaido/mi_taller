import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

function EliminarPieza({ eliminarPieza }) {
  return (
    <Tooltip title="Eliminar pieza de la orden">
      <IconButton aria-label="delete" size="large" color="error" onClick={eliminarPieza}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
}

export default EliminarPieza;
