import React from 'react';
import { Box, Grid } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import ToysIcon from '@mui/icons-material/Toys';
import EMobiledataIcon from '@mui/icons-material/EMobiledata';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import EncabezadoOpciones from '../components/EncabezadoOpciones';
import OpcionCard from '../components/OpcionCard';

export default function AlmacenOpciones() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <EncabezadoOpciones titulo="Gestión de almacén - stock" />
      </Grid>
      <Grid item xs={3}>
        <Box p={2}>
          <OpcionCard titulo="Proveedores" subtitulo="Edición de proveedores, altas, etc..." url="/almacen/proveedores">
            <FactoryIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box p={2}>
          <OpcionCard titulo="Piezas" subtitulo="Edición de piezas, altas, modificaciones, etc..." url="/almacen/piezas">
            <ToysIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box p={2}>
          <OpcionCard titulo="Entradas" subtitulo="Edición de entradas de almacén, albaranes, etc..." url="/almacen/entradas">
            <EMobiledataIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box p={2}>
          <OpcionCard titulo="Informes" subtitulo="Informes de almacén, stock, etc..." url="/almacen/informes">
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
