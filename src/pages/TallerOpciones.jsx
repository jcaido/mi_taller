import React from 'react';
import { Box, Grid } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import SettingsIcon from '@mui/icons-material/Settings';
import OpcionCard from '../components/OpcionCard';
import EncabezadoOpciones from '../components/EncabezadoOpciones';

function TallerOpciones() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <EncabezadoOpciones titulo="Reparaciones - Taller" fontSize={50} />
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <OpcionCard titulo="Autorizacion Propietario" subtitulo="Documento -Orden de Reparacion- para la firma del propietario" url="/taller/autorizacion-ordenes">
            <ThumbUpOffAltIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <OpcionCard titulo="Edicion de -Ordenes de Reparacion-" subtitulo="Añadir piezas, mano de obra, etc..." url="/taller/edicion-ordenes">
            <SettingsIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </OpcionCard>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <OpcionCard titulo="Informes de taller" subtitulo="Informes varios, etc..." url="/taller/informes-ordenes">
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

export default TallerOpciones;
