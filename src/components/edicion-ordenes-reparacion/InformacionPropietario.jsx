import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionPropietario() {
  const { state } = useContext(EdicionOrdenesContext);

  return (
    <Box>
      <Card sx={{ minWidth: 260, height: '180px' }}>
        <CardContent>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
            PROPIETARIO
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Nombre: ' }
            { state.ordenReparacionPorId.vehiculo.propietario.nombre }
            { ' ' }
            { state.ordenReparacionPorId.vehiculo.propietario.primerApellido }
            { ' ' }
            { state.ordenReparacionPorId.vehiculo.propietario.segundoApellido }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'DNI: ' }
            { state.ordenReparacionPorId.vehiculo.propietario.dni }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Domicilio: ' }
            { state.ordenReparacionPorId.vehiculo.propietario.domicilio }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Codigo Postal: ' }
            { state.ordenReparacionPorId.vehiculo.propietario.codigoPostal.codigo }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Localidad: ' }
            { state.ordenReparacionPorId.vehiculo.propietario.codigoPostal.localidad }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { 'Provincia: ' }
            { state.ordenReparacionPorId.vehiculo.propietario.codigoPostal.provincia }
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default InformacionPropietario;
