import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionVehiculo() {
  const { state } = useContext(EdicionOrdenesContext);
  return (
    <Box>
      <Card sx={{ minWidth: 260, height: '180px' }}>
        <CardContent>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
            VEHÍCULO
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Matricula: ' }
            { state.ordenReparacionPorId.vehiculo.matricula }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Marca: ' }
            { state.ordenReparacionPorId.vehiculo.marca }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Modelo: ' }
            { state.ordenReparacionPorId.vehiculo.modelo }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Color: ' }
            { state.ordenReparacionPorId.vehiculo.color }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Kilometros: ' }
            { state.ordenReparacionPorId.kilometros }
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default InformacionVehiculo;
