import React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import InformesOrdenes from '../components/edicion-ordenes-reparacion/InformesOrdenes';

function TallerInformesOrdenes() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="h7" gutterBottom>INFORMES ORDENES DE REPARACION</Typography>
        </Box>
        <Box>
          <InformesOrdenes />
        </Box>
      </Grid>
    </Grid>
  );
}

export default TallerInformesOrdenes;
