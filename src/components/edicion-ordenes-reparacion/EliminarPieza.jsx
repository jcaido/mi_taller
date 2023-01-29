import React from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

function EliminarPieza({ isCerrada, eliminarPieza }) {
  return (
    <Box>
      {isCerrada
        ? (
          <IconButton aria-label="delete" size="large" color="error" onClick={eliminarPieza} disabled>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        )
        : (
          <Tooltip title="Eliminar pieza de la orden">
            <IconButton aria-label="delete" size="large" color="error" onClick={eliminarPieza}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
    </Box>
  );
}

export default EliminarPieza;
