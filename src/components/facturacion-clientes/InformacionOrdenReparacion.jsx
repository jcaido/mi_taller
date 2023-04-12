import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function InformacionOrdenReparacion({
  ordenReparacionAFacturar,
  establecerDatosOrdenReparacionTrue,
  estableerDatosOrdenReparacionFalse,
}) {
  useEffect(() => {
    establecerDatosOrdenReparacionTrue();
    return () => estableerDatosOrdenReparacionFalse();
  }, []);

  function totalPiezas() {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const pieza of ordenReparacionAFacturar.piezasReparacion) {
      total += pieza.cantidad * pieza.pieza.precio;
    }
    return total;
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
          VEHÍCULO
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Referencia (id): '}
          { ordenReparacionAFacturar.id }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          { ordenReparacionAFacturar.vehiculo.marca }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          { ordenReparacionAFacturar.vehiculo.modelo }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          { ordenReparacionAFacturar.vehiculo.matricula }
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
          PROPIETARIO
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { ordenReparacionAFacturar.vehiculo.propietario.nombre }
          &nbsp;
          { ordenReparacionAFacturar.vehiculo.propietario.primerApellido }
          &nbsp;
          { ordenReparacionAFacturar.vehiculo.propietario.segundoApellido }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          { ordenReparacionAFacturar.vehiculo.propietario.dni }
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
          TRABAJOS
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { ordenReparacionAFacturar.descripcion }
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
          MANO DE OBRA
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { ordenReparacionAFacturar.horas }
          &nbsp;
          { 'horas * ' }
          { ordenReparacionAFacturar.manoDeObra.precioHoraClienteTaller }
          &nbsp;
          { '€/hora => ' }
          { ordenReparacionAFacturar.horas
            * ordenReparacionAFacturar.manoDeObra.precioHoraClienteTaller }
          { ' € ' }
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
          PIEZAS
        </Typography>
        {ordenReparacionAFacturar.piezasReparacion.map(
          (pieza) => (
            <Typography key={pieza.id} variant="body2" color="text.secondary">
              { pieza.pieza.referencia }
              &nbsp;&nbsp;&nbsp;
              { pieza.pieza.nombre }
              &nbsp;&nbsp;&nbsp;
              { pieza.cantidad }
              &nbsp;
              {'uds '}
              &nbsp;&nbsp;&nbsp;
              { pieza.pieza.precio.toLocaleString('en') }
              &nbsp;
              {'€/ud '}
              &nbsp;&nbsp;&nbsp;
            </Typography>
          ),
        )}
        <Typography variant="body2" color="text.secondary">
          {'TOTAL PIEZAS => '}
          {totalPiezas().toLocaleString('en')}
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h7" component="div">
          {'TOTAL ORDEN DE REPARACION => '}
          &nbsp;
          {(ordenReparacionAFacturar.horas
            * ordenReparacionAFacturar.manoDeObra.precioHoraClienteTaller
            + totalPiezas()).toLocaleString('en')}
          &nbsp;
          {'€ '}
        </Typography>
      </CardContent>
    </Card>
  );
}
