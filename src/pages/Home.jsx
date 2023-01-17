import React from 'react';
import {
  Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BuildIcon from '@mui/icons-material/Build';
import EuroIcon from '@mui/icons-material/Euro';
import BalanceIcon from '@mui/icons-material/Balance';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          border={1}
          borderColor="grey.300"
          color="text.secondary"
          textAlign="center"
          fontSize={90}
          mb={8}
          p={8}
          boxShadow={5}
        >
          MiTaller
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <AutoStoriesIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Datos generales
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Datos personales, vehiculos, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/datos')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <BuildIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Taller
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ordenes de reparacion, piezas, informes, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/taller/opciones')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <EuroIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Facturación
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Emisión de facturas, proveedores, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/facturacion')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={2}>
          <Card>
            <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
              <BalanceIcon
                color="primary"
                sx={{ fontSize: 100 }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Contabilidad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Plan de cuentas, diarios, mayor, balances, etc...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/contabilidad')}>ACCESO</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
