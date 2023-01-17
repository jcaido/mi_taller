import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

function Propietario() {
  const { state } = useContext(DatosGeneralesFormContext);

  return (
    <Box m={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            NOMBRE:
            {' '}
            { state.propietarioPorDni && state.listaPropietariosPorDni.nombre }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            PRIMER APELLIDO:
            {' '}
            { state.propietarioPorDni && state.listaPropietariosPorDni.primerApellido }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            SEGUNDO APELLIDO:
            {' '}
            { state.propietarioPorDni && state.listaPropietariosPorDni.segundoApellido }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            DNI:
            {' '}
            { state.propietarioPorDni && state.listaPropietariosPorDni.dni }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            DOMICILIO:
            {' '}
            { state.propietarioPorDni && state.listaPropietariosPorDni.domicilio }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            CODIGO POSTAL:
            {' '}
            { state.propietarioPorDni && state.listaPropietariosPorDni.codigoPostal.codigo }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            LOCALIDAD:
            {' '}
            { state.propietarioPorDni && state.listaPropietariosPorDni.codigoPostal.localidad }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            PROVINCIA:
            {' '}
            { state.propietarioPorDni && state.listaPropietariosPorDni.codigoPostal.provincia }
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Propietario;
