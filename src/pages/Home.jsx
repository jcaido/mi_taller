import React from 'react';
import { Box, Grid } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BuildIcon from '@mui/icons-material/Build';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import EuroIcon from '@mui/icons-material/Euro';
import BalanceIcon from '@mui/icons-material/Balance';
import OpcionCard from '../components/OpcionCard';
import EncabezadoOpciones from '../components/EncabezadoOpciones';

function Home() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <EncabezadoOpciones titulo="MiTaller" fontSize={90} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <OpcionCard titulo="Datos generales" subtitulo="Datos personales, vehiculos, etc..." url="/datos">
            <AutoStoriesIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <OpcionCard titulo="Taller" subtitulo="Ordenes de reparacion, piezas, informes, etc..." url="/taller/opciones">
            <BuildIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <OpcionCard titulo="Almacén" subtitulo="Proveedores, piezas, entradas, etc..." url="/almacen/opciones">
            <CorporateFareIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <OpcionCard titulo="Facturación" subtitulo="Emisión de facturas, proveedores, etc..." url="/facturacion">
            <EuroIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <OpcionCard titulo="Contabilidad" subtitulo="Emisión de facturas, proveedores, etc..." url="/contabilidad">
            <BalanceIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
