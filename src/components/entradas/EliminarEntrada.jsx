import React from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export default function EliminarEntrada({ isFacturado, eliminarEntrada }) {
  return (
    <Box>
      {isFacturado
        ? (
          <IconButton aria-label="delete" size="large" color="error" onClick={eliminarEntrada} disabled>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        )
        : (
          <Tooltip title="Eliminar pieza de la orden">
            <IconButton aria-label="delete" size="large" color="error" onClick={eliminarEntrada}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
    </Box>
  );
}
