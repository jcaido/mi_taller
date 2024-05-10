import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DatosGeneralesFormContext } from '../../pages/DatosGenerales';

function Vehiculo() {
  const { state } = useContext(DatosGeneralesFormContext);

  return (
    <Box m={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            MATRICULA:
            {' '}
            { state.vehiculoPorMatricula && state.listaVehiculosPorMatricula.matricula }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            MARCA:
            {' '}
            { state.vehiculoPorMatricula && state.listaVehiculosPorMatricula.marca }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            MODELO:
            {' '}
            { state.vehiculoPorMatricula && state.listaVehiculosPorMatricula.modelo }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            COLOR:
            {' '}
            { state.vehiculoPorMatricula && state.listaVehiculosPorMatricula.color }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            PROPIETARIO:
            {' '}
            { state.vehiculoPorMatricula
            && `${state.listaVehiculosPorMatricula.propietario.nombre} 
                ${state.listaVehiculosPorMatricula.propietario.primerApellido}
                ${state.listaVehiculosPorMatricula.propietario.segundoApellido}`}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            DNI:
            {' '}
            { state.vehiculoPorMatricula && state.listaVehiculosPorMatricula.propietario.dni }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            DOMICILIO:
            {' '}
            { state.vehiculoPorMatricula && state.listaVehiculosPorMatricula.propietario.domicilio }
          </Typography>
          {/*
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            CODIGO POSTAL:
            {' '}
            { state.vehiculoPorMatricula
            && state.listaVehiculosPorMatricula.propietario.codigoPostal.codigo }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            LOCALIDAD:
            {' '}
            { state.vehiculoPorMatricula
            && state.listaVehiculosPorMatricula.propietario.codigoPostal.localidad }
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            PROVINCIA:
            {' '}
            { state.vehiculoPorMatricula
            && state.listaVehiculosPorMatricula.propietario.codigoPostal.provincia }
          </Typography>
          */}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Vehiculo;
