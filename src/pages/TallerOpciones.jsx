import React from 'react';
import {
  Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button,
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

function TallerOpciones() {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          border={1}
          borderColor="grey.300"
          color="text.secondary"
          textAlign="center"
          fontSize={50}
          mb={8}
          p={6}
          boxShadow={5}
        >
          Reparaciones - Taller
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <ThumbUpOffAltIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Autorizacion Propietario
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Documento -Orden de Reparacion- para la firma del propietario
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/taller/autorizacion-ordenes')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <SettingsIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Edicion de -Ordenes de Reparacion-
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Añadir piezas, mano de obra, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/taller/edicion-ordenes')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <ViewComfyIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Informes de taller
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Informes varios, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/taller/informes-ordenes')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default TallerOpciones;
