import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { EdicionOrdenesContext } from '../../pages/TallerEdicionOrdenes';

function InformacionPropietario() {
  const { state } = useContext(EdicionOrdenesContext);

  return (
    <Box>
      Nombre:
      { state.ordenReparacionPorId.vehiculo.propietario.nombre }
      { state.ordenReparacionPorId.vehiculo.propietario.primeApellido }
      { state.ordenReparacionPorId.vehiculo.propietario.segundoApellido }
      DNI:
      { state.ordenReparacionPorId.vehiculo.propietario.dni }
      Domicilio:
      { state.ordenReparacionPorId.vehiculo.propietario.domicilio }
      Codigo Postal:
      { state.ordenReparacionPorId.vehiculo.propietario.codigoPostal.codigo }
      Localidad:
      { state.ordenReparacionPorId.vehiculo.propietario.codigoPostal.localidad }
      Provincia:
      { state.ordenReparacionPorId.vehiculo.propietario.codigoPostal.provincia }
    </Box>
  );
}

export default InformacionPropietario;
