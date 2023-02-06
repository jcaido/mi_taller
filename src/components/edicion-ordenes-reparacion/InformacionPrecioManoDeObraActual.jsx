import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { obtenerPrecioManDeObraActual } from '../../services/axiosService';

function InformacionPrecioManoDeObraActual() {
  const [precioManodeObraActual, setPrecioManodeObraActual] = useState([]);

  useEffect(() => {
    obtenerPrecioManDeObraActual()
      .then((response) => {
        setPrecioManodeObraActual(response.data);
      });
  }, [precioManodeObraActual]);

  return (
    <Card sx={{ minWidth: 150, height: '80px', marginTop: 3 }}>
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
          MANO DE OBRA
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'precio de la mano de obra actual:  ' }
          { precioManodeObraActual.precioHoraClienteTaller }
          { ' €/hora' }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InformacionPrecioManoDeObraActual;
