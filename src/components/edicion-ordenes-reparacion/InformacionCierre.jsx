import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';
import AbrirOrdenForm from './forms/AbrirOrdenForm';

function InformacionCierre() {
  const { state } = useContext(EdicionOrdenesContext);

  return (
    <Box>
      <Card sx={{ minWidth: 260, height: '180px' }}>
        <CardContent>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
            CIERRE
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { state.ordenReparacionPorId.cerrada ? (
              <p>
                { 'Fecha de cierre: ' }
                {state.ordenReparacionPorId.fechaCierre}
              </p>
            ) : <p>Orden de reparacion abierta</p> }
          </Typography>
          <Box mt={6}>
            { state.formAbrirOrdenReparacion ? <AbrirOrdenForm /> : null }
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default InformacionCierre;
