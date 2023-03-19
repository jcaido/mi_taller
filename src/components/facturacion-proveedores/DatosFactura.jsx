import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FacturacionProveedoresContext } from '../../pages/FacturacionProveedores';

export default function DatosFactura() {
  const { state } = useContext(FacturacionProveedoresContext);

  return (
    <Card sx={{
      minWidth: 200, height: '180px', marginLeft: 5, marginRight: 5,
    }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { 'Referencia (id): ' }
          { state.idFacturaProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Fecha Factura: ' }
          { state.fechaFacturaProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Número Factura: ' }
          { state.numeroFacturaProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Proveedor: ' }
          { state.nombreProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'CIF / DNI: ' }
          { state.cifNifProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Domicilio: ' }
          { state.domicilioProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Código Postal: ' }
          { state.codigoPostalProveedor }
          { ' .- ' }
          { state.localidadProveedor }
          { ' .- ' }
          { state.provinciaProveedor }
        </Typography>
      </CardContent>
    </Card>
  );
}
