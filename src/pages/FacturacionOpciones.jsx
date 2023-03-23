import React from 'react';
import { Box, Grid } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import OpcionCard from '../components/OpcionCard';
import EncabezadoOpciones from '../components/EncabezadoOpciones';

export default function FacturacionOpciones() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <EncabezadoOpciones titulo="Facturacion" fontSize={50} />
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <OpcionCard titulo="Proveedores" subtitulo="Gestión de facturación de proveedores ..." url="/facturacion/proveedores">
            <FactoryIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <OpcionCard titulo="Clientes" subtitulo="Gestión de facturación de clientes ..." url="/facturacion/clientes">
            <CarRepairIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <OpcionCard titulo="Informes" subtitulo="Informes de facturación, IVA ..." url="/facturacion/informes">
            <ViewComfyIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
    </Grid>
  );
}
