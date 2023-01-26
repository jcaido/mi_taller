import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionGeneral() {
  const { state } = useContext(EdicionOrdenesContext);
  return (
    <Box>
      <Card sx={{ minWidth: 200, height: '180px' }}>
        <CardContent>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
            ORDEN DE REPARACION
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Referencia (id): ' }
            { state.ordenReparacionPorId.id }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Fecha de apertura: ' }
            { state.ordenReparacionPorId.fechaApertura }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'trabajos: ' }
            { state.ordenReparacionPorId.descripcion }
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default InformacionGeneral;
