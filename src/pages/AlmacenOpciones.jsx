import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button,
} from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import ToysIcon from '@mui/icons-material/Toys';
import EMobiledataIcon from '@mui/icons-material/EMobiledata';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

export default function AlmacenOpciones() {
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
          Gestión de almacén - stock
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <FactoryIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Proveedores
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Edición de proveedores, altas, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/almacen/proveedores')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <ToysIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Piezas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Edición de piezas, altas, modificaciones, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/almacen/piezas')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <EMobiledataIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Entradas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Edición de entradas de almacén, albaranes, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/almacen/entradas')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={3}>
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
                Informes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Informes de almacén, stock, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/almacen/informes')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
