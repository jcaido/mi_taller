import React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import InformesOrdenes from '../components/informes-ordenes-reparacion/InformesOrdenes';

function TallerInformesOrdenes() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="h7" gutterBottom>INFORMES DE TALLER</Typography>
        </Box>
        <Box>
          <InformesOrdenes />
        </Box>
      </Grid>
    </Grid>
  );
}

export default TallerInformesOrdenes;
