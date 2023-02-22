import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AlmacenPiezassContext } from '../../pages/AlmacenPiezas';

export default function Pieza() {
  const { state } = useContext(AlmacenPiezassContext);

  return (
    <Box m={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            REFERENCIA:
            {' '}
            { state.listaPiezas && state.listaPiezas.referencia }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            NOMBRE:
            {' '}
            { state.listaPiezas && state.listaPiezas.nombre }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            PRECIO DE VENTA:
            {' '}
            { state.listaPiezas && state.listaPiezas.precio }
            {' €'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
