import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { obtenerPrecioManDeObraActual } from '../../services/axiosService';

function InformacionPrecioManoDeObraActual({ manodeObraActual, setManodeObraActual }) {
  useEffect(() => {
    obtenerPrecioManDeObraActual()
      .then((response) => {
        setManodeObraActual(response.data);
      });
  }, []);

  return (
    <Card sx={{ minWidth: 150, height: '80px', marginTop: 3 }}>
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
          MANO DE OBRA
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'precio de la mano de obra actual:  ' }
          { manodeObraActual.precioHoraClienteTaller }
          { ' €/hora' }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InformacionPrecioManoDeObraActual;
