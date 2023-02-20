import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AlmacenProveedoresContext } from '../../pages/AlmacenProveedores';

export default function Proveedor() {
  const { state } = useContext(AlmacenProveedoresContext);

  return (
    <Box m={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            NOMBRE:
            {' '}
            { state.listaProveedores && state.listaProveedores.nombre }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            DNI / CIF:
            {' '}
            { state.listaProveedores && state.listaProveedores.dniCif }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            DOMICILIO:
            {' '}
            { state.listaProveedores && state.listaProveedores.domicilio }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            CODIGO POSTAL:
            {' '}
            { state.listaProveedores && state.listaProveedores.codigoPostal.codigo }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            LOCALIDAD:
            {' '}
            { state.listaProveedores && state.listaProveedores.codigoPostal.localidad }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            PROVINCIA:
            {' '}
            { state.listaProveedores && state.listaProveedores.codigoPostal.provincia }
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
