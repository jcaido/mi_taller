import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import { FacturacionProveedoresContext } from '../../pages/FacturacionProveedores';

export default function DatosFactura({
  idFactura,
  fechaFactura,
  numeroFactura,
  nombreProveedor,
  cifNifProveedor,
  domicilioProveedor,
  codigoPostalProveedor,
  localidadProveedor,
  provinciaProveedor,
}) {
  // const { state } = useContext(FacturacionProveedoresContext);

  return (
    <Card sx={{
      minWidth: 200, height: '180px', marginLeft: 5, marginRight: 5,
    }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { 'Referencia (id): ' }
          { idFactura }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Fecha Factura: ' }
          { fechaFactura }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Número Factura: ' }
          { numeroFactura }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Proveedor: ' }
          { nombreProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'CIF / DNI: ' }
          { cifNifProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Domicilio: ' }
          { domicilioProveedor }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'Código Postal: ' }
          { codigoPostalProveedor }
          { ' .- ' }
          { localidadProveedor }
          { ' .- ' }
          { provinciaProveedor }
        </Typography>
      </CardContent>
    </Card>
  );
}
