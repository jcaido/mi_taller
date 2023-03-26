import React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import InformesFacturacion from '../components/informes-facturacion/InformesFacturacion';

export default function FacturacionInformes() {
  return (
    <Grid container>
      <Grid item md={12}>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="h7" gutterBottom>INFORMES DE FACTURACIÓN</Typography>
        </Box>
        <Box>
          <InformesFacturacion />
        </Box>
      </Grid>
    </Grid>
  );
}
