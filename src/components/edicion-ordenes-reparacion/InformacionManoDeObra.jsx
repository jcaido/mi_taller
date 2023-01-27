import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionManoDeObra() {
  const { state } = useContext(EdicionOrdenesContext);

  return (
    <Box>
      <Card sx={{ minWidth: 260, height: '180px' }}>
        <CardContent>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
            MANO DE OBRA
          </Typography>
          {state.ordenReparacionPorId.horas ? (
            <Typography variant="body2" color="text.secondary">
              {state.ordenReparacionPorId.horas}
              {' '}
              horas
            </Typography>
          ) : <Typography variant="body2" color="text.secondary">No hay mano de obra imputada</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
}

export default InformacionManoDeObra;
