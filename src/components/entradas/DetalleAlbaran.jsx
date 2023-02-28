import React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import TablaEntradaPiezas from './TablaEntradaPiezas';

export default function DetalleAlbaran({ albaran }) {
  function totalAlbaran() {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const pieza of albaran.entradasPiezas) {
      total += pieza.cantidad * pieza.precioEntrada;
    }
    return total;
  }

  return (
    <Grid container>
      <Grid item md={3}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
            {'REFERENCIA-id (albarán) ): '}
            {albaran.id}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={9}>
        {albaran.facturado
          ? (
            <Box>
              <Typography sx={{ fontWeight: 'bold', color: 'red' }} gutterBottom variant="h7" component="div">
                Albaran facturado
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography sx={{ fontWeight: 'bold', color: 'green' }} gutterBottom variant="h7" component="div">
                Albaran pendiente de facturar
              </Typography>
            </Box>
          )}
      </Grid>
      <Grid item md={3}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h8" component="div">
            {'PROVEEDOR: '}
            {albaran.proveedor.nombre}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h8" component="div">
            {'CIF/NIF: '}
            {albaran.proveedor.dniCif}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h8" component="div">
            {'FECHA ALBARÁN: '}
            {albaran.fechaAlbaran}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h8" component="div">
            {'NÚMERO DE ALBARÁN: '}
            {albaran.numeroAlbaran}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={12}>
        <Box>
          {albaran.entradasPiezas.length === 0
            ? <p>no hay piezas</p> : <TablaEntradaPiezas albaran={albaran} />}
        </Box>
        <Box m={2}>
          <Typography sx={{ fontWeight: 'bold', color: 'red' }} gutterBottom variant="h8" component="div">
            {'TOTAL ALBARÁN: '}
            {(totalAlbaran()).toLocaleString('en')}
            {' €'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
