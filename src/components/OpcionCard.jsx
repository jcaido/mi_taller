import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, CardActions, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function OpcionCard({
  children, titulo, subtitulo, url,
}) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia sx={{ textAlign: 'center', padding: 4 }}>
        {children}
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitulo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(url)}>ACCESO</Button>
      </CardActions>
    </Card>
  );
}

export default OpcionCard;
