import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FacturacionProveedoresContext } from '../../pages/FacturacionProveedores';

export default function TotalesFactura({ baseImponible, albaranesAsignados }) {
  const { state } = useContext(FacturacionProveedoresContext);

  return (
    <Card sx={{
      minWidth: 200, height: '180px', marginLeft: 5, marginRight: 5,
    }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { 'BASE IMPONIBLE: ' }
          { baseImponible(albaranesAsignados).toLocaleString('en') }
          { ' €'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'TIPO IVA: ' }
          { state.tipoIVAFacturaProveedor }
          { ' %'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'CUOTA IVA: ' }
          { ((baseImponible(albaranesAsignados) * state.tipoIVAFacturaProveedor) / 100).toLocaleString('en') }
          { ' €'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { 'TOTAL FACTURA: ' }
          { (baseImponible(albaranesAsignados) + ((baseImponible(albaranesAsignados) * state.tipoIVAFacturaProveedor) / 100)).toLocaleString('en') }
          { ' €'}
        </Typography>
      </CardContent>
    </Card>
  );
}
