import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'referencia', headerName: 'Referencia', width: 250 },
  { field: 'nombre', headerName: 'NombreF', width: 400 },
  { field: 'precio', headerName: 'Precio de venta', width: 250 },
];

export default function TablaPiezasBusquedas({ lista }) {
  return (
    <div style={{ height: 315, width: '100%' }}>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        rows={lista}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}
