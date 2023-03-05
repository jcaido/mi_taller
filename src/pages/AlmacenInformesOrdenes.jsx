import React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import InformesAlmacen from '../components/informes-almacen/InformesAlmacen';

export default function AlmacenInformesOrdenes() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="h7" gutterBottom>INFORMES DE ALMACÉN</Typography>
        </Box>
        <Box>
          <InformesAlmacen />
        </Box>
      </Grid>
    </Grid>
  );
}
